import { createSyntaxDiagramsCode } from "chevrotain";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { baseVocabulary, CronLexer } from "./src/lexer";
import { BaseParser } from "./src/parser";

// Just doing lots of testing in there
const parser = new BaseParser(baseVocabulary, false);
// Parse the input into tokens
const lexingResult = CronLexer.tokenize("5 4 * * *");
console.log(lexingResult);
parser.input = lexingResult.tokens;

// Parse the tokens into a CST
const cst = parser.cronExpression();

// Grammar diagram generation
const serializedGrammar = parser.getSerializedGastProductions();
// create the HTML Text
const htmlText = createSyntaxDiagramsCode(serializedGrammar);
// Write the HTML file to disk
writeFileSync("./generated_diagrams.html", htmlText);

// Semantic analysis
// const ast = cronVisitor.visit(cst);

// writeFileSync(outPath + "/ast.json", JSON.stringify(ast));
// // Generate the cron expression from the AST
// writeFileSync(outPath + "/cron.txt", ast.value());
