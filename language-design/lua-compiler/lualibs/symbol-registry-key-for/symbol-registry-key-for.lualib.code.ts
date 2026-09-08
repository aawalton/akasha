import { __TS__SymbolRegistry } from "../symbol-registry/symbol-registry.lualib.code.ts"

const symbolRegistry = __TS__SymbolRegistry

export function __TS__SymbolRegistryKeyFor(this: void, sym: symbol): string | undefined {
  for (const key in symbolRegistry) {
    if (symbolRegistry[key] === sym) return key
  }

  return undefined
}
