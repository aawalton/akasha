type DropZoneResult =
  | {
      type: "reorder"
      position: "before" | "after"
    }
  | {
      type: "nest"
    }

interface ItemRect {
  top: number
  height: number
}

export function computeDropZone(
  rect: ItemRect,
  pointerY: number,
  isRootItem: boolean
): DropZoneResult | null {
  const { top, height } = rect
  if (height === 0) return null

  const relativeY = pointerY - top
  const ratio = relativeY / height

  if (ratio < 0 || ratio > 1) return null

  if (ratio < 0.25) {
    return { type: "reorder", position: "before" }
  }
  if (ratio > 0.75) {
    return { type: "reorder", position: "after" }
  }
  if (isRootItem) {
    return { type: "nest" }
  }
  return { type: "reorder", position: ratio < 0.5 ? "before" : "after" }
}

export type DropZoneInfo = {
  id: string
  type: "reorder" | "nest"
  position?: "before" | "after"
} | null

export function findDropZone(
  items: ReadonlyArray<{ id: string; rect: ItemRect; isRoot: boolean }>,
  pointerY: number,
  activeId: string
): DropZoneInfo {
  const candidates = items.filter((item) => item.id !== activeId)
  if (candidates.length === 0) return null

  let bestZone: DropZoneInfo = null
  let bestDistance = Number.POSITIVE_INFINITY

  for (const item of candidates) {
    const zone = computeDropZone(item.rect, pointerY, item.isRoot)
    if (!zone) continue

    const center = item.rect.top + item.rect.height / 2
    const distance = Math.abs(pointerY - center)

    if (distance < bestDistance) {
      bestDistance = distance
      bestZone = {
        id: item.id,
        type: zone.type,
        position: zone.type === "reorder" ? zone.position : undefined,
      }
    }
  }

  if (bestZone) return bestZone

  let firstItem: (typeof candidates)[number] | null = null
  let lastItem: (typeof candidates)[number] | null = null

  for (const item of candidates) {
    if (!firstItem || item.rect.top < firstItem.rect.top) {
      firstItem = item
    }
    const bottom = item.rect.top + item.rect.height
    if (!lastItem || bottom > lastItem.rect.top + lastItem.rect.height) {
      lastItem = item
    }
  }

  if (firstItem && pointerY < firstItem.rect.top) {
    return { id: firstItem.id, type: "reorder", position: "before" }
  }
  if (lastItem && pointerY > lastItem.rect.top + lastItem.rect.height) {
    return { id: lastItem.id, type: "reorder", position: "after" }
  }

  return null
}
