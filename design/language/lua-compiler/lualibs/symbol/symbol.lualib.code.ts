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
