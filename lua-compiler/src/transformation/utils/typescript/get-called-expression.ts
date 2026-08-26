import * as ts from "typescript"

export function getCalledExpression(node: ts.CallExpression): ts.Expression {
  return ts.skipOuterExpressions(node.expression)
}
