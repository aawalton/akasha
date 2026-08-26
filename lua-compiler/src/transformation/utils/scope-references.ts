import type * as ts from "typescript"
import * as luaCore from "../../LuaAST-core"
import { getOrUpdate } from "../../utils"
import type { TransformationContext } from "../context/transformation-context"

export function markSymbolAsReferencedInCurrentScopes(
  context: TransformationContext,
  symbolId: luaCore.SymbolId,
  identifier: ts.Identifier
): undefined {
  for (const scope of context.scopeStack) {
    scope.referencedSymbols ??= new Map()

    const references = getOrUpdate(scope.referencedSymbols, symbolId, () => [])
    references.push(identifier)
  }
}
