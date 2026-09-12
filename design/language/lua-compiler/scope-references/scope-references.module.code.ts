import type * as luaCore from "akasha/design/language/lua-compiler/lua-ast-core/lua-ast-core.module.code.ts"
import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import { getOrUpdate } from "akasha/design/language/lua-compiler/utils/utils.module.code.ts"
import type * as ts from "typescript"

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
