import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const armorStylesChest = {
  id: "01a06165-9165-7008-b7c4-08c998cce861",
  type: "page-type/temper-collectible-category",
  slug: "armor-styles-chest",
  title: "Chest",
  parent: "temper-collectible-category/armor-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
