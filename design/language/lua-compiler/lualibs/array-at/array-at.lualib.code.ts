export function __TS__ArrayAt<T>(this: T[], relativeIndex: number): T | undefined {
  const absoluteIndex = relativeIndex < 0 ? this.length + relativeIndex : relativeIndex

  if (absoluteIndex >= 0 && absoluteIndex < this.length) {
    return this[absoluteIndex]
  }

  return undefined
}
