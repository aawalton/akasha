import { LuaTarget } from "akasha/design/language/lua-compiler/compiler-options/compiler-options.module.code.ts"
import type { TransformationContext } from "akasha/design/language/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "akasha/design/language/lua-compiler/context-visitors/context-visitors.module.code.ts"
import {
  getIterableExtensionKindForNode,
  IterableExtensionKind,
} from "akasha/design/language/lua-compiler/language-extension-kinds/language-extension-kinds.module.code.ts"
import { createUnpackCall } from "akasha/design/language/lua-compiler/lua-ast/lua-ast.module.code.ts"
import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import { transformLuaLibFunction } from "akasha/design/language/lua-compiler/lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/lualib-features/lualib-features.module.code.ts"
import {
  findScope,
  hasReferencedSymbol,
  hasReferencedUndefinedLocalFunction,
  ScopeType,
} from "akasha/design/language/lua-compiler/scope/scope.module.code.ts"
import { isOptimizedVarArgSpreadHolder } from "akasha/design/language/lua-compiler/symbols-deps/symbols-deps.module.code.ts"
import {
  findFirstNonOuterParent,
  isAlwaysArrayType,
} from "akasha/design/language/lua-compiler/typescript/typescript.module.code.ts"
import { isMultiReturnCall } from "akasha/design/language/lua-compiler/visit-extension-multi/visit-extension-multi.module.code.ts"
import { isGlobalVarargConstant } from "akasha/design/language/lua-compiler/visit-extension-vararg/visit-extension-vararg.module.code.ts"
import { assertNever } from "akasha/utils/narrow/modules/assert-never/assert-never.module.code.ts"
import * as ts from "typescript"

function isOptimizedVarArgSpread(
  context: TransformationContext,
  symbol: ts.Symbol,
  identifier: ts.Identifier
) {
  if (!ts.isSpreadElement(findFirstNonOuterParent(identifier))) {
    return false
  }

  const scope = findScope(
    context,
    ScopeType.Function | ScopeType.Try | ScopeType.Catch | ScopeType.File
  )
  if (!scope) {
    return
  }

  if (isGlobalVarargConstant(context, symbol, scope)) {
    return true
  }

  if (!ts.isFunctionLike(scope.node)) {
    return false
  }

  if (
    ts.canHaveModifiers(scope.node) &&
    ts.getModifiers(scope.node)?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword)
  ) {
    return false
  }

  const isSpreadParameter = (p: ts.ParameterDeclaration) =>
    p.dotDotDotToken &&
    ts.isIdentifier(p.name) &&
    context.checker.getSymbolAtLocation(p.name) === symbol
  if (!scope.node.parameters.some(isSpreadParameter)) {
    return false
  }

  if (hasReferencedSymbol(context, scope, symbol)) {
    return false
  }

  if (hasReferencedUndefinedLocalFunction(context, scope)) {
    return false
  }
  return true
}

isOptimizedVarArgSpreadHolder.fn = isOptimizedVarArgSpread

export const transformSpreadElement: FunctionVisitor<ts.SpreadElement> = (node, context) => {
  const tsInnerExpression = ts.skipOuterExpressions(node.expression)
  if (ts.isIdentifier(tsInnerExpression)) {
    const symbol = context.checker.getSymbolAtLocation(tsInnerExpression)
    if (symbol && isOptimizedVarArgSpread(context, symbol, tsInnerExpression)) {
      return context.luaTarget === LuaTarget.Lua50
        ? createUnpackCall(context, luaExpressions.createArgLiteral(), node)
        : luaExpressions.createDotsLiteral(node)
    }
  }

  const innerExpression = context.transformExpression(node.expression)
  if (isMultiReturnCall(context, tsInnerExpression)) return innerExpression

  const iterableExtensionType = getIterableExtensionKindForNode(context, node.expression)
  if (iterableExtensionType != null) {
    if (iterableExtensionType === IterableExtensionKind.Iterable) {
      return transformLuaLibFunction(
        context,
        LuaLibFeature.LuaIteratorSpread,
        node,
        innerExpression
      )
    } else if (iterableExtensionType === IterableExtensionKind.Pairs) {
      const objectEntries = transformLuaLibFunction(
        context,
        LuaLibFeature.ObjectEntries,
        node,
        innerExpression
      )
      return createUnpackCall(context, objectEntries, node)
    } else if (iterableExtensionType === IterableExtensionKind.PairsKey) {
      const objectKeys = transformLuaLibFunction(
        context,
        LuaLibFeature.ObjectKeys,
        node,
        innerExpression
      )
      return createUnpackCall(context, objectKeys, node)
    } else {
      assertNever(iterableExtensionType)
    }
  }

  const type = context.checker.getTypeAtLocation(node.expression)
  if (isAlwaysArrayType(context, type)) {
    return createUnpackCall(context, innerExpression, node)
  }

  return transformLuaLibFunction(context, LuaLibFeature.Spread, node, innerExpression)
}
