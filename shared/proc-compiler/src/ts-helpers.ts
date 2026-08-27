import ts from "typescript"

export function isCtxAccess(node: ts.PropertyAccessExpression): boolean {
  return ts.isIdentifier(node.expression) && node.expression.text === "ctx"
}
