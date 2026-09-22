import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const armorStylesFeet = {
  id: "01a06165-9165-7009-9930-253074bcd746",
  type: "page-type/temper-collectible-category",
  slug: "armor-styles-feet",
  title: "Feet",
  parent: "temper-collectible-category/armor-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
