import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const nonCombatPetsExotic = {
  id: "01a06165-916a-700c-8260-c4e511ae3051",
  type: "page-type/temper-collectible-category",
  slug: "non-combat-pets-exotic",
  title: "Exotic",
  parent: "temper-collectible-category/non-combat-pets",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
