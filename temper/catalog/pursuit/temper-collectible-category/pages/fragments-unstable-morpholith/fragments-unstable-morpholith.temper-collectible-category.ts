import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsUnstableMorpholith = {
  id: "01a06165-9168-7017-ab03-d2b427522536",
  type: "page-type/temper-collectible-category",
  slug: "fragments-unstable-morpholith",
  title: "Unstable Morpholith",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
