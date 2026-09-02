import type { UnfulfilledGearNeed } from "@akasha/temper-items-core/companion-gear-diff"
import {
  type CompanionGearPriceResult,
  type CompanionGearSlotDescriptor,
  lookupCompanionGearPrice,
  lookupCompanionGearPriceForSlot,
} from "@akasha/temper-trading-pricing/companion-gear-price-lookup"
import type { PricingData } from "@akasha/temper-trading-pricing/pricing-types"

const ARMOR_ITEM_NAMES: Record<string, Record<string, string>> = {
  head: { Light: "Hat", Medium: "Helmet", Heavy: "Helm" },
  shoulders: { Light: "Epaulets", Medium: "Arm Cops", Heavy: "Pauldrons" },
  chest: { Light: "Robe", Medium: "Jack", Heavy: "Cuirass" },
  hands: { Light: "Gloves", Medium: "Bracers", Heavy: "Gauntlets" },
  waist: { Light: "Sash", Medium: "Belt", Heavy: "Girdle" },
  legs: { Light: "Breeches", Medium: "Guards", Heavy: "Greaves" },
  feet: { Light: "Shoes", Medium: "Boots", Heavy: "Sabatons" },
}

const JEWELRY_ITEM_NAMES: Record<string, string> = {
  necklace: "Necklace",
  "ring-1": "Ring",
  "ring-2": "Ring",
}

export function getCompanionGearItemName(need: UnfulfilledGearNeed): string {
  if (need.category === "weapon") return `Companion's ${need.weaponType ?? need.slotName}`
  if (need.category === "jewelry")
    return `Companion's ${JEWELRY_ITEM_NAMES[need.slotId] ?? need.slotName}`
  const armorSlot = ARMOR_ITEM_NAMES[need.slotId]
  if (armorSlot != null && need.weight != null)
    return `Companion's ${armorSlot[need.weight] ?? need.slotName}`
  return `Companion's ${need.slotName}`
}

export function formatGold(value: number): string {
  return Number.isFinite(value) ? value.toLocaleString("en-US") : "—"
}

export type SlotPriceKey = string
export type BlendedPriceKey = `${string}:${string}`

export function buildSlotPriceMap(
  needs: readonly UnfulfilledGearNeed[],
  pricing: PricingData
): Map<SlotPriceKey, CompanionGearPriceResult> {
  const prices = new Map<SlotPriceKey, CompanionGearPriceResult>()

  for (const [i, need] of needs.entries()) {
    const descriptor: CompanionGearSlotDescriptor = {
      category: need.category,
      slotId: need.slotId,
      weight: need.weight?.toLowerCase(),
      weaponTypeId: need.weaponTypeId,
    }
    const result = lookupCompanionGearPriceForSlot(pricing, descriptor, need.trait, need.quality)
    if (result) {
      prices.set(`${need.trait}:${need.quality}:${need.companionId}:${need.slotId}:${i}`, result)
    }
  }

  return prices
}

export function buildBlendedPriceMap(
  needs: readonly UnfulfilledGearNeed[],
  pricing: PricingData
): Map<BlendedPriceKey, CompanionGearPriceResult> {
  const prices = new Map<BlendedPriceKey, CompanionGearPriceResult>()
  const seen = new Set<BlendedPriceKey>()

  for (const need of needs) {
    const key = `${need.trait}:${need.quality}` satisfies BlendedPriceKey
    if (seen.has(key)) continue
    seen.add(key)

    const result = lookupCompanionGearPrice(pricing, need.trait, need.quality)
    if (result) {
      prices.set(key, result)
    }
  }

  return prices
}

export function resolveNeedPrice(
  need: UnfulfilledGearNeed,
  index: number,
  slotPriceMap: Map<SlotPriceKey, CompanionGearPriceResult>,
  blendedPriceMap: Map<BlendedPriceKey, CompanionGearPriceResult>
): CompanionGearPriceResult | null {
  const slotKey = `${need.trait}:${need.quality}:${need.companionId}:${need.slotId}:${index}`
  return slotPriceMap.get(slotKey) ?? blendedPriceMap.get(`${need.trait}:${need.quality}`) ?? null
}

export function computeGroupCost(
  groupNeeds: readonly { need: UnfulfilledGearNeed & { owned?: boolean }; index: number }[],
  slotPriceMap: Map<SlotPriceKey, CompanionGearPriceResult>,
  blendedPriceMap: Map<BlendedPriceKey, CompanionGearPriceResult>
): number | null {
  let total = 0
  for (const { need, index } of groupNeeds) {
    if (need.owned) continue
    const price = resolveNeedPrice(need, index, slotPriceMap, blendedPriceMap)
    if (price) total += price.estimatedCost
  }
  return total > 0 ? total : null
}

export function computeTotalCost(
  needs: readonly (UnfulfilledGearNeed & { owned?: boolean })[],
  slotPriceMap: Map<SlotPriceKey, CompanionGearPriceResult>,
  blendedPriceMap: Map<BlendedPriceKey, CompanionGearPriceResult>
): number | null {
  let total = 0
  for (const [i, need] of needs.entries()) {
    if (need.owned) continue
    const price = resolveNeedPrice(need, i, slotPriceMap, blendedPriceMap)
    if (price) {
      total += price.estimatedCost
    }
  }
  return total > 0 ? total : null
}
