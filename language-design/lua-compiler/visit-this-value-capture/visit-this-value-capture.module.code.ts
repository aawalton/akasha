import type { TransformationContext } from "akasha/language-design/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "akasha/language-design/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/language-design/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import type * as ts from "typescript"

export interface ExpressionWithThisValue {
  expression: luaExpressions.Expression
  thisValue?: luaExpressions.Expression
}

export function captureThisValue(
  context: TransformationContext,
  expression: luaExpressions.Expression,
  thisValueCapture: luaExpressions.Identifier,
  tsOriginal: ts.Node
): luaExpressions.Expression {
  if (!context.shouldMoveToTemp(expression, tsOriginal)) {
    return expression
  }
  const tempAssignment = luaStatements.createAssignmentStatement(
    thisValueCapture,
    expression,
    tsOriginal
  )
  context.addPrecedingStatements(tempAssignment)
  return thisValueCapture
}
