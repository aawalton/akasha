import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsMasterOfSchemes = {
  id: "01a06165-9167-701b-ae15-87252ef9d2d8",
  type: "page-type/temper-collectible-category",
  slug: "fragments-master-of-schemes",
  title: "Master of Schemes",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
