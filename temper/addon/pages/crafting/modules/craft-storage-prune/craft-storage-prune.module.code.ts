export type StorageSlot = Record<string, number | undefined>
export type StorageMap = Record<string, StorageSlot | undefined>

export function pruneEmptyStorage(storage: StorageMap): number {
  let removed = 0
  for (const link of Object.keys(storage)) {
    const slot = storage[link]
    if (slot === undefined) {
      delete storage[link]
      removed = removed + 1
      continue
    }
    let positive = 0
    for (const name of Object.keys(slot)) {
      const count = slot[name]
      if (count === undefined || count < 1) {
        slot[name] = undefined
      } else {
        positive = positive + 1
      }
    }
    if (positive === 0) {
      delete storage[link]
      removed = removed + 1
    }
  }
  return removed
}
