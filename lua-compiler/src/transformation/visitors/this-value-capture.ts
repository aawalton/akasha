import type * as ts from "typescript"
import * as luaStatements from "../../LuaAST-statements"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"

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
  const tempAssignment = luaStatements.createAssignmentStatement(thisValueCapture, expression, tsOriginal)
  context.addPrecedingStatements(tempAssignment)
  return thisValueCapture
}
