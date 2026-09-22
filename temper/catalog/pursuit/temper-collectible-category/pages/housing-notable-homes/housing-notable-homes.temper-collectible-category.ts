import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const housingNotableHomes = {
  id: "01a06165-9169-7003-af56-183cc1122a06",
  type: "page-type/temper-collectible-category",
  slug: "housing-notable-homes",
  title: "Notable Homes",
  parent: "temper-collectible-category/housing",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
