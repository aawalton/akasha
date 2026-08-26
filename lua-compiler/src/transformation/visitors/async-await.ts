import * as ts from "typescript"
import * as luaStatements from "../../LuaAST-statements"
import * as luaExpressions from "../../LuaAST-expressions"
import type { TransformationContext } from "../context/transformation-context"
import type { FunctionVisitor } from "../context/visitors"
import { awaitMustBeInAsyncFunction } from "../utils/diagnostics"
import { importLuaLibFeature, transformLuaLibFunction } from "../utils/lualib"
import { LuaLibFeature } from "../../LuaLib"
import { isInAsyncFunction } from "../utils/typescript/nodes"

export const transformAwaitExpression: FunctionVisitor<ts.AwaitExpression> = (node, context) => {
  if (!isInAsyncFunction(node)) {
    context.addDiagnostic(awaitMustBeInAsyncFunction(node))
  }

  const expression = context.transformExpression(node.expression)
  return transformLuaLibFunction(context, LuaLibFeature.Await, node, expression)
}

export function isAsyncFunction(declaration: ts.FunctionLikeDeclaration): boolean {
  return declaration.modifiers?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword) ?? false
}

export function wrapInAsyncAwaiter(
  context: TransformationContext,
  statements: readonly luaStatements.Statement[],
  includeResolveParameter = true
): luaExpressions.CallExpression {
  importLuaLibFeature(context, LuaLibFeature.Await)

  const parameters = includeResolveParameter ? [luaExpressions.createIdentifier("____awaiter_resolve")] : []

  return luaExpressions.createCallExpression(luaExpressions.createIdentifier("__TS__AsyncAwaiter"), [
    luaExpressions.createFunctionExpression(luaStatements.createBlock(statements), parameters),
  ])
}
