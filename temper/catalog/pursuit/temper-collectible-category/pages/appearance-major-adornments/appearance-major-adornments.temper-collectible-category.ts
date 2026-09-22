import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const appearanceMajorAdornments = {
  id: "01a06165-9165-7001-94ba-3b90b180a2ad",
  type: "page-type/temper-collectible-category",
  slug: "appearance-major-adornments",
  title: "Major Adornments",
  parent: "temper-collectible-category/appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
