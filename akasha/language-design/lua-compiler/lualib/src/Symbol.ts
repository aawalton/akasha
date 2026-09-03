const symbolMetatable = {
  __tostring(this: symbol): string {
    return `Symbol(${this.description ?? ""})`
  },
}

function widen<T>(this: void, x: T): unknown {
  return x
}

function asSymbol(x: unknown): symbol {
  return x as symbol
}

export function __TS__Symbol(this: void, description?: string | number): symbol {
  return asSymbol(widen(setmetatable({ description }, symbolMetatable)))
}

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
