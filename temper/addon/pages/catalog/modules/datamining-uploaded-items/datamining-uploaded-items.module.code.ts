export interface MinedItemsUploaded {
  readonly apiVersion: string
  readonly throughItemId: number
}

interface MinedItemsState {
  readonly apiVersion?: string
  readonly completed?: boolean
}

export function itemsKeptAfterUpload<Entry>(
  this: void,
  items: Record<number, Entry> | undefined,
  uploaded: MinedItemsUploaded | undefined,
  state: MinedItemsState
): Record<number, Entry> | undefined {
  if (items === undefined || uploaded === undefined) return items
  if (state.completed !== true) return items
  if (state.apiVersion !== uploaded.apiVersion) return items

  const kept: Record<number, Entry> = {}
  let dropped = false
  for (const [key, entry] of Object.entries(items)) {
    const itemId = Number(key)
    if (itemId <= uploaded.throughItemId) {
      dropped = true
      continue
    }
    kept[itemId] = entry
  }
  return dropped ? kept : items
}
