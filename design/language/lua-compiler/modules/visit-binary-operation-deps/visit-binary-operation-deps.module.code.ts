import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "akasha/design/language/lua-compiler/modules/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import type * as luaStatements from "akasha/design/language/lua-compiler/modules/lua-ast-statements/lua-ast-statements.module.code.ts"
import type { WithPrecedingStatements } from "akasha/design/language/lua-compiler/modules/preceding-statements/preceding-statements.module.code.ts"
import type { BitOperator } from "akasha/design/language/lua-compiler/modules/visit-bit/visit-bit.module.code.ts"
import type { SimpleOperator } from "akasha/design/language/lua-compiler/modules/visitors-binary-expression/visitors-binary-expression.module.code.ts"
import type * as ts from "typescript"

export type TransformBinaryOperationFn = (
  context: TransformationContext,
  left: luaExpressions.Expression,
  right: luaExpressions.Expression,
  rightPrecedingStatements: readonly luaStatements.Statement[],
  operator: BitOperator | SimpleOperator | ts.SyntaxKind.QuestionQuestionToken,
  node: ts.Node
) => WithPrecedingStatements<luaExpressions.Expression>

export const TRANSFORM_BINARY_OPERATION_HOLDER: {
  fn: TransformBinaryOperationFn | undefined
} = {
  fn: undefined,
}

export function requireTransformBinaryOperation(): TransformBinaryOperationFn {
  if (TRANSFORM_BINARY_OPERATION_HOLDER.fn === undefined) {
    throw new Error(
      "binary-expression: transformBinaryOperation not registered — binary-expression/index must load before transformBinaryOperation is called"
    )
  }
  return TRANSFORM_BINARY_OPERATION_HOLDER.fn
}
