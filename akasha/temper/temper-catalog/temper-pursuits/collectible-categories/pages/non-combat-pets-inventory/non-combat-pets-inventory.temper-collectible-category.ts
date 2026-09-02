import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const nonCombatPetsInventory = {
  id: "01a06165-916a-700f-b6bb-8241d2fac6a2",
  pageTypeSlug: "temper-collectible-category",
  slug: "non-combat-pets-inventory",
  title: "Inventory",
  parent: "non-combat-pets",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
