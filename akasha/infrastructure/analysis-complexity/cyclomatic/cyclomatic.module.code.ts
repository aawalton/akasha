import ts from "typescript"
import {
  type FunctionNode,
  isFunctionBearing,
} from "../walk-functions/walk-functions.module.code.ts"

export function computeCyclomaticComplexity(node: FunctionNode): number {
  const body = node.body
  if (body === undefined) return 1
  let cc = 1
  function visit(n: ts.Node): undefined {
    if (n !== node && isFunctionBearing(n)) return
    if (ts.isIfStatement(n)) {
      cc++
    } else if (ts.isCaseClause(n)) {
      cc++
    } else if (ts.isForStatement(n)) {
      cc++
    } else if (ts.isForInStatement(n)) {
      cc++
    } else if (ts.isForOfStatement(n)) {
      cc++
    } else if (ts.isWhileStatement(n)) {
      cc++
    } else if (ts.isDoStatement(n)) {
      cc++
    } else if (ts.isCatchClause(n)) {
      cc++
    } else if (ts.isConditionalExpression(n)) {
      cc++
    } else if (ts.isBinaryExpression(n)) {
      const op = n.operatorToken.kind
      if (
        op === ts.SyntaxKind.AmpersandAmpersandToken ||
        op === ts.SyntaxKind.BarBarToken ||
        op === ts.SyntaxKind.QuestionQuestionToken
      ) {
        cc++
      }
    } else if (ts.isPropertyAccessExpression(n) && n.questionDotToken !== undefined) {
      cc++
    } else if (ts.isElementAccessExpression(n) && n.questionDotToken !== undefined) {
      cc++
    } else if (ts.isCallExpression(n) && n.questionDotToken !== undefined) {
      cc++
    }
    ts.forEachChild(n, visit)
  }
  visit(body)
  return cc
}
