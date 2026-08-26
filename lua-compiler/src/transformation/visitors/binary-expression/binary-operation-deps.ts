import type * as ts from "typescript"
import * as luaStatements from "../../../LuaAST-statements"
import * as luaExpressions from "../../../LuaAST-expressions"
import type { TransformationContext } from "../../context/transformation-context"
import type { WithPrecedingStatements } from "../../utils/preceding-statements"
import type { BitOperator } from "./bit"
import type { SimpleOperator } from "./index"

export type TransformBinaryOperationFn = (
  context: TransformationContext,
  left: luaExpressions.Expression,
  right: luaExpressions.Expression,
  rightPrecedingStatements: readonly luaStatements.Statement[],
  operator: BitOperator | SimpleOperator | ts.SyntaxKind.QuestionQuestionToken,
  node: ts.Node
) => WithPrecedingStatements<luaExpressions.Expression>

export const transformBinaryOperationHolder: {
  fn: TransformBinaryOperationFn | undefined
} = {
  fn: undefined,
}

export function requireTransformBinaryOperation(): TransformBinaryOperationFn {
  if (transformBinaryOperationHolder.fn === undefined) {
    throw new Error(
      "binary-expression: transformBinaryOperation not registered — binary-expression/index must load before transformBinaryOperation is called"
    )
  }
  return transformBinaryOperationHolder.fn
}
