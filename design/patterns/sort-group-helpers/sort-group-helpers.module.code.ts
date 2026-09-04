export type SortDropZone = { rowId: string; position: "before" | "after" } | null

export interface SortRowMeasure {
  id: string
  top: number
  height: number
}

export function computeSortDropZone(
  rows: readonly SortRowMeasure[],
  pointerY: number,
  activeId: string
): SortDropZone {
  const candidates = rows.filter((r) => r.id !== activeId)
  let best = candidates[0]
  if (best === undefined) return null
  let bestDistance = Number.POSITIVE_INFINITY
  for (const row of candidates) {
    const distance = Math.abs(pointerY - (row.top + row.height / 2))
    if (distance < bestDistance) {
      bestDistance = distance
      best = row
    }
  }
  const position = pointerY < best.top + best.height / 2 ? "before" : "after"
  return { rowId: best.id, position }
}

export function applySortDrop(
  order: readonly string[],
  activeId: string,
  zone: NonNullable<SortDropZone>
): readonly string[] {
  const without = order.filter((id) => id !== activeId)
  const anchorIndex = without.indexOf(zone.rowId)
  if (anchorIndex === -1) return order
  const insertAt = zone.position === "before" ? anchorIndex : anchorIndex + 1
  return [...without.slice(0, insertAt), activeId, ...without.slice(insertAt)]
}
