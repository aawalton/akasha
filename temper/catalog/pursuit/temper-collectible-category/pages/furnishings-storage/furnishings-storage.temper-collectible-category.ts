import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const furnishingsStorage = {
  id: "01a06165-9168-701e-a8d8-ede079833c61",
  type: "page-type/temper-collectible-category",
  slug: "furnishings-storage",
  title: "Storage",
  parent: "temper-collectible-category/furnishings",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
