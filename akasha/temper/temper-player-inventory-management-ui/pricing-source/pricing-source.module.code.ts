import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"

export type PricingSourceNoteKind = "none" | "missing-source" | "source-empty"

function hasAnyItem(inventory: InventoryDatabase): boolean {
  for (const location of Object.values(inventory.locations)) {
    for (const bag of Object.values(location.bags)) {
      if (Object.keys(bag).length > 0) return true
    }
  }
  return false
}

function hasAnyPricedItem(inventory: InventoryDatabase): boolean {
  for (const location of Object.values(inventory.locations)) {
    for (const bag of Object.values(location.bags)) {
      for (const item of Object.values(bag)) {
        if (item.estimatedValue !== undefined) return true
      }
    }
  }
  return false
}

export function resolvePricingSourceNote(input: {
  inventory: InventoryDatabase | null
  isSettled: boolean
}): PricingSourceNoteKind {
  if (!input.isSettled) return "none"
  const inventory = input.inventory
  if (!inventory) return "none"

  const priceSource = inventory.meta.priceSource
  if (priceSource === undefined) return "none"
  if (priceSource === "none") return "missing-source"

  if (hasAnyItem(inventory) && !hasAnyPricedItem(inventory)) return "source-empty"
  return "none"
}
