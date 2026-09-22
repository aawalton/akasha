import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const housingStapleHomes = {
  id: "01a06165-9169-7004-8afd-17c24961455b",
  type: "page-type/temper-collectible-category",
  slug: "housing-staple-homes",
  title: "Staple Homes",
  parent: "temper-collectible-category/housing",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
