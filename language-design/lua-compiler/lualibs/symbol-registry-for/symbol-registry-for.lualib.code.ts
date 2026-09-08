import { __TS__Symbol } from "../../lualib/src/Symbol.ts"
import { __TS__SymbolRegistry } from "../symbol-registry/symbol-registry.lualib.code.ts"

const symbolRegistry = __TS__SymbolRegistry

export function __TS__SymbolRegistryFor(this: void, key: string): symbol {
  if (!symbolRegistry[key]) {
    symbolRegistry[key] = __TS__Symbol(key)
  }

  return symbolRegistry[key]
}
