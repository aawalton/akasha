export function mergeByKey<T>(
  stored: Record<number, T> | undefined,
  fresh: Record<number, T>,
  foldEntry: (stored: T, fresh: T) => T
): Record<number, T> {
  if (stored === undefined) return fresh

  const merged: Record<number, T> = {}
  for (const [key, storedValue] of Object.entries(stored)) {
    merged[Number(key)] = storedValue
  }
  for (const [key, freshValue] of Object.entries(fresh)) {
    const index = Number(key)
    const priorValue = merged[index]
    merged[index] = priorValue === undefined ? freshValue : foldEntry(priorValue, freshValue)
  }
  return merged
}
