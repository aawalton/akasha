import type { TransformationContext } from "akasha/design/language/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaCore from "akasha/design/language/lua-compiler/lua-ast-core/lua-ast-core.module.code.ts"
import { markSymbolAsReferencedInCurrentScopes } from "akasha/design/language/lua-compiler/scope-references/scope-references.module.code.ts"
import { requireIsOptimizedVarArgSpread } from "akasha/design/language/lua-compiler/symbols-deps/symbols-deps.module.code.ts"
import type * as ts from "typescript"

export interface SymbolInfo {
  symbol: ts.Symbol
  firstSeenAtPos: number
}

export function getSymbolInfo(
  context: TransformationContext,
  symbolId: luaCore.SymbolId
): SymbolInfo | undefined {
  return context.symbolInfoMap.get(symbolId)
}

export function getSymbolIdOfSymbol(
  context: TransformationContext,
  symbol: ts.Symbol
): luaCore.SymbolId | undefined {
  return context.symbolIdMaps.get(symbol)
}

export function trackSymbolReference(
  context: TransformationContext,
  symbol: ts.Symbol,
  identifier: ts.Identifier
): luaCore.SymbolId | undefined {
  let symbolId = context.symbolIdMaps.get(symbol)
  if (symbolId === undefined) {
    symbolId = context.nextSymbolId()

    context.symbolIdMaps.set(symbol, symbolId)
    context.symbolInfoMap.set(symbolId, { symbol, firstSeenAtPos: identifier.pos })
  }

  if (!requireIsOptimizedVarArgSpread()(context, symbol, identifier)) {
    markSymbolAsReferencedInCurrentScopes(context, symbolId, identifier)
  }

  return symbolId
}

export function getIdentifierSymbolId(
  context: TransformationContext,
  identifier: ts.Identifier,
  symbol: ts.Symbol | undefined
): luaCore.SymbolId | undefined {
  if (symbol) {
    return trackSymbolReference(context, symbol, identifier)
  }
}
