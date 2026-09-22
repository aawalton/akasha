import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const appearanceHeadMarkings = {
  id: "01a06165-9165-7000-ad21-8162f1fa5f64",
  type: "page-type/temper-collectible-category",
  slug: "appearance-head-markings",
  title: "Head Markings",
  parent: "temper-collectible-category/appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
