import { stockPriorityRank } from "akasha/temper/items/rules/core/modules/stock-item-priority/stock-item-priority.module.code.ts"

export interface StoreOffer {
  readonly entryIndex: number
  readonly itemId: number
  readonly itemType: number
  readonly link: string
  readonly price: number
  readonly maxBuyable: number
}

export function bestOffer(
  offers: readonly StoreOffer[],
  itemIds: readonly number[] | undefined
): StoreOffer | undefined {
  let best: StoreOffer | undefined
  let bestRank = 0
  for (const offer of offers) {
    const rank = stockPriorityRank(itemIds, offer.itemId)
    if (best === undefined || rank < bestRank) {
      best = offer
      bestRank = rank
    }
  }
  return best
}

export function itemTypesOf(offers: readonly StoreOffer[]): number[] {
  const types: number[] = []
  for (const offer of offers) {
    if (!types.includes(offer.itemType)) types.push(offer.itemType)
  }
  return types
}

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
