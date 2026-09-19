import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "akasha/design/language/lua-compiler/modules/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import type * as ts from "typescript"

export type TransformTypeOfBinaryExpressionFn = (
  context: TransformationContext,
  node: ts.BinaryExpression
) => luaExpressions.Expression | undefined

export const TRANSFORM_TYPE_OF_BINARY_EXPRESSION_HOLDER: {
  fn: TransformTypeOfBinaryExpressionFn | undefined
} = {
  fn: undefined,
}

export function requireTransformTypeOfBinaryExpression(): TransformTypeOfBinaryExpressionFn {
  if (TRANSFORM_TYPE_OF_BINARY_EXPRESSION_HOLDER.fn === undefined) {
    throw new Error(
      "binary-expression/index: transformTypeOfBinaryExpression not registered — visitors/typeof must load before transformBinaryExpression is called"
    )
  }
  return TRANSFORM_TYPE_OF_BINARY_EXPRESSION_HOLDER.fn
}
