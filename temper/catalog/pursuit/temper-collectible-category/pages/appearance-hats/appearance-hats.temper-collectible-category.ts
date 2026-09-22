import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const appearanceHats = {
  id: "01a06165-9164-7007-a5c1-d318dffca294",
  type: "page-type/temper-collectible-category",
  slug: "appearance-hats",
  title: "Hats",
  parent: "temper-collectible-category/appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
