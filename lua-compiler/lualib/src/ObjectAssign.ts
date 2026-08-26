export function __TS__ObjectAssign<T extends object>(this: void, target: T, ...sources: T[]): T {
  for (const i of $range(1, sources.length)) {
    const source = sources[i - 1]
    for (const key in source) {
      target[key] = source[key]
    }
  }

  return target
}
