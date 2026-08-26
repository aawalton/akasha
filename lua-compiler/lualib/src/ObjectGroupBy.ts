export function __TS__ObjectGroupBy<K extends PropertyKey, T>(
  this: void,
  items: Iterable<T>,
  keySelector: (item: T, index: number) => K
): Partial<Record<K, T[]>> {
  const result: Partial<Record<K, T[]>> = {}

  let i = 0
  for (const item of items) {
    const key = keySelector(item, i)

    const existing = result[key]
    if (existing !== undefined) {
      existing.push(item)
    } else {
      result[key] = [item]
    }

    i++
  }

  return result
}
