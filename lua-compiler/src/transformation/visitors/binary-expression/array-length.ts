import * as ts from "typescript"
import type { TransformationContext } from "../../context/transformation-context"
import { isArrayType } from "../../utils/typescript/typescript"

export function isArrayLength(
  context: TransformationContext,
  expression: ts.Expression
): expression is ts.PropertyAccessExpression | ts.ElementAccessExpression {
  if (!ts.isPropertyAccessExpression(expression) && !ts.isElementAccessExpression(expression)) {
    return false
  }

  const type = context.checker.getTypeAtLocation(expression.expression)
  if (!isArrayType(context, type)) {
    return false
  }

  const name = ts.isPropertyAccessExpression(expression)
    ? expression.name.text
    : ts.isStringLiteral(expression.argumentExpression)
      ? expression.argumentExpression.text
      : undefined

  return name === "length"
}
