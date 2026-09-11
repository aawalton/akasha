import ts from "typescript"

export function readFieldKey(expr: ts.Expression): string | undefined {
  if (ts.isPropertyAccessExpression(expr) && ts.isIdentifier(expr.expression)) {
    return `${expr.expression.text}.${expr.name.text}`
  }
  if (
    ts.isElementAccessExpression(expr) &&
    ts.isIdentifier(expr.expression) &&
    ts.isStringLiteralLike(expr.argumentExpression)
  ) {
    return `${expr.expression.text}.${expr.argumentExpression.text}`
  }
  return undefined
}
