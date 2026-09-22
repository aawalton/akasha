import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const armorStylesWaist = {
  id: "01a06165-9166-7004-bf07-222205ad7957",
  type: "page-type/temper-collectible-category",
  slug: "armor-styles-waist",
  title: "Waist",
  parent: "temper-collectible-category/armor-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
