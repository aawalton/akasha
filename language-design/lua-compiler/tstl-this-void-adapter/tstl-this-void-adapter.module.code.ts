import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import {
  ContextType,
  getFunctionContextType,
} from "../tstl-function-context/tstl-function-context.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"

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
