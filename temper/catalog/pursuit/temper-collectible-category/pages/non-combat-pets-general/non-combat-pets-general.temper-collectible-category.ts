import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const nonCombatPetsGeneral = {
  id: "01a06165-916a-700e-8336-5203b095e198",
  type: "page-type/temper-collectible-category",
  slug: "non-combat-pets-general",
  title: "General",
  parent: "temper-collectible-category/non-combat-pets",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
