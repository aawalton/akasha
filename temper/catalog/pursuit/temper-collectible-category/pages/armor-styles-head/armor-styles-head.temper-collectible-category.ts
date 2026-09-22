import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const armorStylesHead = {
  id: "01a06165-9166-7001-9343-0f4d50581685",
  type: "page-type/temper-collectible-category",
  slug: "armor-styles-head",
  title: "Head",
  parent: "temper-collectible-category/armor-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
