import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import { awaitMustBeInAsyncFunction } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import {
  importLuaLibFeature,
  transformLuaLibFunction,
} from "../tstl-lualib/tstl-lualib.module.code.ts"
import { isInAsyncFunction } from "../tstl-typescript/tstl-typescript.module.code.ts"

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

  const parameters = includeResolveParameter
    ? [luaExpressions.createIdentifier("____awaiter_resolve")]
    : []

  return luaExpressions.createCallExpression(
    luaExpressions.createIdentifier("__TS__AsyncAwaiter"),
    [luaExpressions.createFunctionExpression(luaStatements.createBlock(statements), parameters)]
  )
}
