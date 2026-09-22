import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const appearanceMinorAdornments = {
  id: "01a06165-9165-7002-b15b-709136cdbf8c",
  type: "page-type/temper-collectible-category",
  slug: "appearance-minor-adornments",
  title: "Minor Adornments",
  parent: "temper-collectible-category/appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
