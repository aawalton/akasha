import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const housingClassicHomes = {
  id: "01a06165-9169-7002-9b1c-7c5429c5e600",
  type: "page-type/temper-collectible-category",
  slug: "housing-classic-homes",
  title: "Classic Homes",
  parent: "temper-collectible-category/housing",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
