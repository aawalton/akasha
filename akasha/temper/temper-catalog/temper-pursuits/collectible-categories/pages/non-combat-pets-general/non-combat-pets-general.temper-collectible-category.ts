import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const nonCombatPetsGeneral = {
  id: "01a06165-916a-700e-8336-5203b095e198",
  pageTypeSlug: "temper-collectible-category",
  slug: "non-combat-pets-general",
  title: "General",
  parent: "non-combat-pets",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
