export const SPECIALIZED_TREASURE_MAP = 100

export const SPECIALIZED_SURVEY_REPORT = 101

export interface TreasureSlot {
  readonly slotIndex: number
  readonly itemId: number
  readonly specializedItemType: number
  readonly name: string
}

export interface Spot {
  readonly mapId: number
  readonly x: number
  readonly y: number
}

export interface SpotRecord extends Spot {
  readonly itemId: number
}

export interface MapFrame {
  readonly offsetX: number
  readonly offsetY: number
  readonly width: number
  readonly height: number
}

interface KnownTreasure {
  readonly slot: TreasureSlot
  readonly spots: readonly Spot[]
}

export function isTreasureItem(this: void, specializedItemType: number): boolean {
  return (
    specializedItemType === SPECIALIZED_TREASURE_MAP ||
    specializedItemType === SPECIALIZED_SURVEY_REPORT
  )
}

function slotsInPortOrder(this: void, slots: readonly TreasureSlot[]): TreasureSlot[] {
  return [...slots].sort((a, b) => a.slotIndex - b.slotIndex)
}

export function spotsByItem(this: void, records: readonly SpotRecord[]): Record<number, Spot[]> {
  const byItem: Record<number, Spot[]> = {}
  for (const record of records) {
    const spots = byItem[record.itemId] ?? []
    byItem[record.itemId] = spots
    const seen = spots.some(
      (spot) => spot.mapId === record.mapId && spot.x === record.x && spot.y === record.y
    )
    if (!seen) spots.push({ mapId: record.mapId, x: record.x, y: record.y })
  }
  return byItem
}

export function firstKnownTreasure(
  this: void,
  slots: readonly TreasureSlot[],
  spots: Record<number, Spot[]>
): KnownTreasure | undefined {
  for (const slot of slotsInPortOrder(slots)) {
    if (!isTreasureItem(slot.specializedItemType)) continue
    const known = spots[slot.itemId]
    if (known !== undefined && known.length > 0) return { slot, spots: known }
  }
  return undefined
}

export function reexpress(
  this: void,
  x: number,
  y: number,
  inner: MapFrame,
  outer: MapFrame
): [number, number] {
  const universalX = inner.offsetX + x * inner.width
  const universalY = inner.offsetY + y * inner.height
  return [(universalX - outer.offsetX) / outer.width, (universalY - outer.offsetY) / outer.height]
}

export function universalDistance(
  this: void,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  frame: MapFrame
): number {
  const dx = (toX - fromX) * frame.width
  const dy = (toY - fromY) * frame.height
  return Math.sqrt(dx * dx + dy * dy)
}
