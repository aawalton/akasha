import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import { getOrUpdate } from "../tstl-utils/tstl-utils.module.code.ts"

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
