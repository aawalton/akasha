import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"

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
