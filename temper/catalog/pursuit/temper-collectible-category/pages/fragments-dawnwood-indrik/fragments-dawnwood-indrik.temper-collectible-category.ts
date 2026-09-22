import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsDawnwoodIndrik = {
  id: "01a06165-9167-700f-8703-c14188dc5c9a",
  type: "page-type/temper-collectible-category",
  slug: "fragments-dawnwood-indrik",
  title: "Dawnwood Indrik",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
