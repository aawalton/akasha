import * as ts from "typescript"
import { LuaTarget } from "../../CompilerOptions"
import * as luaExpressions from "../../LuaAST-expressions"
import { assertNever } from "@shared/utils-narrow/assert-never"
import type { TransformationContext } from "../context/transformation-context"
import type { FunctionVisitor } from "../context/visitors"
import {
  getIterableExtensionKindForNode,
  IterableExtensionKind,
} from "../utils/language-extensions"
import { createUnpackCall } from "../utils/lua-ast"
import { transformLuaLibFunction } from "../utils/lualib"
import { LuaLibFeature } from "../../LuaLib"
import {
  findScope,
  hasReferencedSymbol,
  hasReferencedUndefinedLocalFunction,
  ScopeType,
} from "../utils/scope"
import { isOptimizedVarArgSpreadHolder } from "../utils/symbols-deps"
import { findFirstNonOuterParent } from "../utils/typescript/typescript"
import { isAlwaysArrayType } from "../utils/typescript/typescript"
import { isMultiReturnCall } from "./language-extensions/multi"
import { isGlobalVarargConstant } from "./language-extensions/vararg"

export function isOptimizedVarArgSpread(
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
