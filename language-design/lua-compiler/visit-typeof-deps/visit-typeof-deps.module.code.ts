import type { TransformationContext } from "akasha/language-design/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "akasha/language-design/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import type * as ts from "typescript"

export type TransformTypeOfBinaryExpressionFn = (
  context: TransformationContext,
  node: ts.BinaryExpression
) => luaExpressions.Expression | undefined

export const transformTypeOfBinaryExpressionHolder: {
  fn: TransformTypeOfBinaryExpressionFn | undefined
} = {
  fn: undefined,
}

export function requireTransformTypeOfBinaryExpression(): TransformTypeOfBinaryExpressionFn {
  if (transformTypeOfBinaryExpressionHolder.fn === undefined) {
    throw new Error(
      "binary-expression/index: transformTypeOfBinaryExpression not registered — visitors/typeof must load before transformBinaryExpression is called"
    )
  }
  return transformTypeOfBinaryExpressionHolder.fn
}
