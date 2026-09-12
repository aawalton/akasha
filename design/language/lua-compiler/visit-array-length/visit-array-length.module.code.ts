import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import { isArrayType } from "akasha/design/language/lua-compiler/typescript/typescript.module.code.ts"
import * as ts from "typescript"

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
