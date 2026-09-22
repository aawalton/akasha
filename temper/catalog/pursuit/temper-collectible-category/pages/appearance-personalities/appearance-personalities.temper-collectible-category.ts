import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const appearancePersonalities = {
  id: "01a06165-9165-7003-8ef0-91f607f30334",
  type: "page-type/temper-collectible-category",
  slug: "appearance-personalities",
  title: "Personalities",
  parent: "temper-collectible-category/appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
