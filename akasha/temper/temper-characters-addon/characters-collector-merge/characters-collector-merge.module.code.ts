export function mergeIdList(
  stored: readonly number[] | undefined,
  fresh: readonly number[]
): number[] {
  const merged: number[] = []
  const seen: Record<number, boolean> = {}

  if (stored !== undefined) {
    for (const id of stored) {
      if (seen[id] === true) continue
      seen[id] = true
      merged.push(id)
    }
  }

  for (const id of fresh) {
    if (seen[id] === true) continue
    seen[id] = true
    merged.push(id)
  }

  return merged
}

export function mergeIdListsByKey(
  stored: Record<number, number[]> | undefined,
  fresh: Record<number, number[]>
): Record<number, number[]> {
  if (stored === undefined) return fresh

  const merged: Record<number, number[]> = {}
  for (const [key, storedIds] of Object.entries(stored)) {
    merged[Number(key)] = storedIds
  }
  for (const [key, freshIds] of Object.entries(fresh)) {
    const index = Number(key)
    const priorIds = merged[index]
    merged[index] = priorIds === undefined ? freshIds : mergeIdList(priorIds, freshIds)
  }
  return merged
}

export function mergeMaxByKey(
  stored: Record<number, number> | undefined,
  fresh: Record<number, number>
): Record<number, number> {
  if (stored === undefined) return fresh

  const merged: Record<number, number> = {}
  for (const [key, storedValue] of Object.entries(stored)) {
    merged[Number(key)] = storedValue
  }
  for (const [key, freshValue] of Object.entries(fresh)) {
    const index = Number(key)
    const priorValue = merged[index]
    merged[index] = priorValue === undefined || freshValue > priorValue ? freshValue : priorValue
  }
  return merged
}
