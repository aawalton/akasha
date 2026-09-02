import { mergeByKey } from "../characters-keyed-merge/characters-keyed-merge.module.code.ts"

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
  return mergeByKey(stored, fresh, mergeIdList)
}

export function mergeMaxByKey(
  stored: Record<number, number> | undefined,
  fresh: Record<number, number>
): Record<number, number> {
  return mergeByKey(stored, fresh, (priorValue, freshValue) =>
    freshValue > priorValue ? freshValue : priorValue
  )
}
