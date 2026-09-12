import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import {
  importLuaLibFeature,
  transformLuaLibFunction,
} from "akasha/design/language/lua-compiler/lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/lualib-features/lualib-features.module.code.ts"
import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "akasha/design/language/lua-compiler/modules/context-visitors/context-visitors.module.code.ts"
import { awaitMustBeInAsyncFunction } from "akasha/design/language/lua-compiler/transform-diagnostics/transform-diagnostics.module.code.ts"
import { isInAsyncFunction } from "akasha/design/language/lua-compiler/typescript/typescript.module.code.ts"
import * as ts from "typescript"

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
  importLuaLibFeature(context, LuaLibFeature.AsyncAwaiter)

  const parameters = includeResolveParameter
    ? [luaExpressions.createIdentifier("____awaiter_resolve")]
    : []

  return luaExpressions.createCallExpression(
    luaExpressions.createIdentifier("__TS__AsyncAwaiter"),
    [luaExpressions.createFunctionExpression(luaStatements.createBlock(statements), parameters)]
  )
}
