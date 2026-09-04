export type StarvedSlot = {
  readonly slotIndex: number
  readonly patternUntrained: boolean
}

export function reserveNoveltySlot(starved: readonly StarvedSlot[]): number | null {
  const byPosition = [...starved].sort((a, b) => a.slotIndex - b.slotIndex)
  const earliest = byPosition[0]
  if (earliest === undefined) return null
  const untrained = byPosition.find((slot) => slot.patternUntrained)
  return (untrained ?? earliest).slotIndex
}
