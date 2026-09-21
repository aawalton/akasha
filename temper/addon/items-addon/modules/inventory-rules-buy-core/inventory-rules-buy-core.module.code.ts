export function computeGlobalTotal(
  liveCurrentCharBackpack: number,
  currentCharId: string,
  byChar: Record<string, number> | undefined,
  accountStock: number | undefined
): number {
  let total = liveCurrentCharBackpack + (accountStock ?? 0)
  if (byChar) {
    for (const [charId, count] of Object.entries(byChar)) {
      if (charId === currentCharId) continue
      total += count
    }
  }
  return total
}

export function computeBuyQuantity(
  shortfall: number,
  maxBuyable: number,
  playerMoney: number,
  unitPrice: number
): number {
  if (shortfall <= 0) return 0
  if (maxBuyable <= 0) return 0
  const affordable = unitPrice > 0 ? Math.floor(playerMoney / unitPrice) : maxBuyable
  let n = shortfall
  if (maxBuyable < n) n = maxBuyable
  if (affordable < n) n = affordable
  return n > 0 ? n : 0
}
