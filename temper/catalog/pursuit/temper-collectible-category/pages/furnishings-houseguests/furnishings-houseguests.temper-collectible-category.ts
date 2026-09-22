import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const furnishingsHouseguests = {
  id: "01a06165-9168-701d-a61c-998bf1790d55",
  type: "page-type/temper-collectible-category",
  slug: "furnishings-houseguests",
  title: "Houseguests",
  parent: "temper-collectible-category/furnishings",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
