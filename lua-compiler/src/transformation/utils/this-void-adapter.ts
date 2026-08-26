import * as ts from "typescript"
import * as luaCore from "../../LuaAST-core"
import * as luaStatements from "../../LuaAST-statements"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"
import { ContextType, getFunctionContextType } from "./function-context"

function isCalleePosition(tsExpression: ts.Expression): boolean {
  const parent = tsExpression.parent
  return parent !== undefined && ts.isCallExpression(parent) && parent.expression === tsExpression
}

function contextualTypeExpectsSelfFul(
  context: TransformationContext,
  tsExpression: ts.Expression
): boolean {
  const contextualType = context.checker.getContextualType(tsExpression)
  if (!contextualType) return false
  return getFunctionContextType(context, contextualType) === ContextType.NonVoid
}

export function willWrapThisVoidAdapter(
  context: TransformationContext,
  tsExpression: ts.Expression
): boolean {
  if (isCalleePosition(tsExpression)) return false
  const staticType = context.checker.getTypeAtLocation(tsExpression)
  if (getFunctionContextType(context, staticType) !== ContextType.Void) return false
  return contextualTypeExpectsSelfFul(context, tsExpression)
}

export function maybeWrapThisVoidAsAdapter(
  context: TransformationContext,
  tsExpression: ts.Expression,
  luaExpression: luaExpressions.Expression,
  source: "fromType" | "forced"
): luaExpressions.Expression {
  if (source === "fromType") {
    if (!willWrapThisVoidAdapter(context, tsExpression)) return luaExpression
  } else {
    if (isCalleePosition(tsExpression)) return luaExpression
    if (!contextualTypeExpectsSelfFul(context, tsExpression)) return luaExpression
  }

  const refExpression = luaExpressions.isIdentifier(luaExpression)
    ? luaExpression
    : context.moveToPrecedingTemp(luaExpression, tsExpression)

  return luaExpressions.createFunctionExpression(
    luaStatements.createBlock([
      luaStatements.createReturnStatement([
        luaExpressions.createCallExpression(refExpression, [luaExpressions.createDotsLiteral()]),
      ]),
    ]),
    [luaExpressions.createAnonymousIdentifier()],
    luaExpressions.createDotsLiteral(),
    luaCore.NodeFlags.Inline,
    tsExpression
  )
}
