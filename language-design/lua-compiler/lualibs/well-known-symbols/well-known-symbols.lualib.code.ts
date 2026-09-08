import { __TS__Symbol } from "../symbol/symbol.lualib.code.ts"

interface SymbolLike {
  asyncDispose: symbol
  dispose: symbol
  iterator: symbol
  hasInstance: symbol
  species: symbol
  toStringTag: symbol
}

export const Symbol = {
  asyncDispose: __TS__Symbol("Symbol.asyncDispose"),
  dispose: __TS__Symbol("Symbol.dispose"),
  iterator: __TS__Symbol("Symbol.iterator"),
  hasInstance: __TS__Symbol("Symbol.hasInstance"),

  species: __TS__Symbol("Symbol.species"),
  toStringTag: __TS__Symbol("Symbol.toStringTag"),
} satisfies SymbolLike
