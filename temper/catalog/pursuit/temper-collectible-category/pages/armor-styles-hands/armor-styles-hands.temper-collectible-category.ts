import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const armorStylesHands = {
  id: "01a06165-9166-7000-ae96-d233bca85f60",
  type: "page-type/temper-collectible-category",
  slug: "armor-styles-hands",
  title: "Hands",
  parent: "temper-collectible-category/armor-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
