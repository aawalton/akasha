import type { TransformationContext } from "akasha/language-design/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "akasha/language-design/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import type * as luaStatements from "akasha/language-design/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import type { WithPrecedingStatements } from "akasha/language-design/lua-compiler/preceding-statements/preceding-statements.module.code.ts"
import type { BitOperator } from "akasha/language-design/lua-compiler/visit-bit/visit-bit.module.code.ts"
import type { SimpleOperator } from "akasha/language-design/lua-compiler/visitors-binary-expression/visitors-binary-expression.module.code.ts"
import type * as ts from "typescript"

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
