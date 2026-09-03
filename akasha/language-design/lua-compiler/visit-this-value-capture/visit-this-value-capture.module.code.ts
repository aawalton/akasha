import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"

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
