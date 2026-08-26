import type * as ts from "typescript"
import * as luaExpressions from "../../../LuaAST-expressions"
import type { TransformationContext } from "../../context/transformation-context"

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
