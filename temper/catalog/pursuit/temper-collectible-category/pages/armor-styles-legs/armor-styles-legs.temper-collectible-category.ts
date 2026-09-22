import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const armorStylesLegs = {
  id: "01a06165-9166-7002-969d-b083a4e92d5f",
  type: "page-type/temper-collectible-category",
  slug: "armor-styles-legs",
  title: "Legs",
  parent: "temper-collectible-category/armor-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
