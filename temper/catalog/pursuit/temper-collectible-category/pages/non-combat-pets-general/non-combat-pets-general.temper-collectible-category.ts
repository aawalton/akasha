import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const nonCombatPetsGeneral = {
  id: "01a06165-916a-700e-8336-5203b095e198",
  type: "page-type/temper-collectible-category",
  slug: "non-combat-pets-general",
  title: "General",
  parent: "temper-collectible-category/non-combat-pets",
  collectibles: "jsonl",
  createdAt: "2026-09-02T09:14:01.450Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperCollectibleCategory
