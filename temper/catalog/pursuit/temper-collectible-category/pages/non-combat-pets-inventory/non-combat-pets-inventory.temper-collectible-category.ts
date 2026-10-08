import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const nonCombatPetsInventory = {
  id: "01a06165-916a-700f-b6bb-8241d2fac6a2",
  type: "page-type/temper-collectible-category",
  slug: "non-combat-pets-inventory",
  title: "Inventory",
  parent: "temper-collectible-category/non-combat-pets",
  collectibles: "jsonl",
  createdAt: "2026-09-02T09:14:01.450Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperCollectibleCategory
