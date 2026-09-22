import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsScalesOfAkatosh = {
  id: "01a06165-9168-700f-9eff-939dd4012bf4",
  type: "page-type/temper-collectible-category",
  slug: "fragments-scales-of-akatosh",
  title: "Scales of Akatosh",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
