export type ColumnDropZone = { columnId: string; position: "before" | "after" } | null

export interface ColumnRectMeasure {
  id: string
  left: number
  width: number
}

export function computeColumnDropZone(
  columns: readonly ColumnRectMeasure[],
  pointerX: number,
  activeId: string
): ColumnDropZone {
  const candidates = columns.filter((c) => c.id !== activeId)
  let best = candidates[0]
  if (best === undefined) return null
  let bestDistance = Number.POSITIVE_INFINITY
  for (const column of candidates) {
    const distance = Math.abs(pointerX - (column.left + column.width / 2))
    if (distance < bestDistance) {
      bestDistance = distance
      best = column
    }
  }
  const position = pointerX < best.left + best.width / 2 ? "before" : "after"
  return { columnId: best.id, position }
}

export function applyColumnDrop(
  order: readonly string[],
  activeId: string,
  zone: NonNullable<ColumnDropZone>
): readonly string[] {
  const without = order.filter((id) => id !== activeId)
  const anchorIndex = without.indexOf(zone.columnId)
  if (anchorIndex === -1) return order
  const insertAt = zone.position === "before" ? anchorIndex : anchorIndex + 1
  return [...without.slice(0, insertAt), activeId, ...without.slice(insertAt)]
}

export function reorderVisibleProperties(
  currentVisible: readonly string[],
  orderedColumnIds: readonly string[]
): readonly string[] {
  const columnSet = new Set(orderedColumnIds)
  const trailing = currentVisible.filter((id) => !columnSet.has(id))
  return [...orderedColumnIds, ...trailing]
}
