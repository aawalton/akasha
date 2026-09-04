import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import type * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import type { WithPrecedingStatements } from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import type { BitOperator } from "../visit-bit/visit-bit.module.code.ts"
import type { SimpleOperator } from "../visitors-binary-expression/visitors-binary-expression.module.code.ts"

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
