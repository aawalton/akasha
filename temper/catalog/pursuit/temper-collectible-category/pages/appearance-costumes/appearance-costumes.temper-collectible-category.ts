import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const appearanceCostumes = {
  id: "01a06165-9164-7004-9a33-9da02ca6b12d",
  type: "page-type/temper-collectible-category",
  slug: "appearance-costumes",
  title: "Costumes",
  parent: "temper-collectible-category/appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
