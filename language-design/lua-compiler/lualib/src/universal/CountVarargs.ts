/** @noSelfInFile */
export function __TS__CountVarargs<T>(...args: T[]): number {
  return select("#", ...args)
}
