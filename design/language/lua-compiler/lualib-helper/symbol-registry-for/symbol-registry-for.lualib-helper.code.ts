import { __TS__Symbol } from "akasha/design/language/lua-compiler/lualib-helper/symbol/symbol.lualib-helper.code.ts"
import { __TS__SymbolRegistry } from "akasha/design/language/lua-compiler/lualib-helper/symbol-registry/symbol-registry.lualib-helper.code.ts"

const symbolRegistry = __TS__SymbolRegistry

export function __TS__SymbolRegistryFor(this: void, key: string): symbol {
  if (!symbolRegistry[key]) {
    symbolRegistry[key] = __TS__Symbol(key)
  }

  return symbolRegistry[key]
}
