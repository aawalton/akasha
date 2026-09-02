import { isPriceEntry } from "../is-price-entry/is-price-entry.module.code.ts"
import type { PricingData } from "../pricing-types/pricing-types.module.code.ts"

interface CrownEquivalentItem {
  ttcItemId: string
  coordinates: { quality: string; level: string; trait: string }
}

export type CrownPriceMissReason =
  | "item-absent"
  | "quality-absent"
  | "level-absent"
  | "trait-absent"
  | "no-positive-price"

export type CrownPriceOutcome =
  | { readonly kind: "priced"; readonly gold: number }
  | {
      readonly kind: "unpriced"
      readonly ttcItemId: string
      readonly reason: CrownPriceMissReason
    }

export function describeCrownPriceMiss(esoItemId: number, outcome: CrownPriceOutcome): string {
  return outcome.kind === "priced"
    ? `${esoItemId}: ${outcome.gold} gold`
    : `${esoItemId} -> TTC ${outcome.ttcItemId}: ${outcome.reason}`
}

const CROWN_CONSUMABLE_EQUIVALENTS: Record<number, CrownEquivalentItem> = {
  64711: {
    ttcItemId: "21074",
    coordinates: { quality: "4", level: "1", trait: "-1" },
  },
  64710: {
    ttcItemId: "3520",
    coordinates: { quality: "0", level: "200", trait: "-1" },
  },
  112427: {
    ttcItemId: "3300",
    coordinates: { quality: "0", level: "200", trait: "-1" },
  },
  112428: {
    ttcItemId: "1882",
    coordinates: { quality: "0", level: "200", trait: "-1" },
  },
}

export const CROWN_CONSUMABLE_ITEM_IDS = new Set(
  Object.values(CROWN_CONSUMABLE_EQUIVALENTS).map((item) => item.ttcItemId)
)

export const CROWN_CONSUMABLE_ESO_IDS = new Set(
  Object.keys(CROWN_CONSUMABLE_EQUIVALENTS).map(Number)
)

const CROWN_STORE_NAME_PATTERN = /^(Crown |Gold Coast )/

export function isUncoveredCrownConsumable(itemId: number, itemName: string): boolean {
  return CROWN_STORE_NAME_PATTERN.test(itemName) && !CROWN_CONSUMABLE_ESO_IDS.has(itemId)
}

function lookupPrice(data: PricingData["Data"], item: CrownEquivalentItem): CrownPriceOutcome {
  const unpriced = (reason: CrownPriceMissReason): CrownPriceOutcome => ({
    kind: "unpriced",
    ttcItemId: item.ttcItemId,
    reason,
  })

  const itemData = data[item.ttcItemId]
  if (!itemData) return unpriced("item-absent")

  const qualityData = itemData[item.coordinates.quality]
  if (!qualityData) return unpriced("quality-absent")

  const levelData = qualityData[item.coordinates.level]
  if (!levelData) return unpriced("level-absent")

  const traitData = levelData[item.coordinates.trait]
  if (!traitData) return unpriced("trait-absent")

  if (isPriceEntry(traitData)) {
    const price = Math.max(traitData.SA ?? 0, traitData.N ?? 0)
    return price > 0 ? { kind: "priced", gold: price } : unpriced("no-positive-price")
  }

  let bestPrice = 0
  for (const value of Object.values(traitData)) {
    if (isPriceEntry(value)) {
      const price = Math.max(value.SA ?? 0, value.N ?? 0)
      if (price > bestPrice) bestPrice = price
    }
  }
  return bestPrice > 0 ? { kind: "priced", gold: bestPrice } : unpriced("no-positive-price")
}

export function lookupCrownReplacementCosts(
  pricing: PricingData
): ReadonlyMap<number, CrownPriceOutcome> {
  const outcomes = new Map<number, CrownPriceOutcome>()

  for (const [esoItemId, item] of Object.entries(CROWN_CONSUMABLE_EQUIVALENTS)) {
    outcomes.set(Number(esoItemId), lookupPrice(pricing.Data, item))
  }

  return outcomes
}
