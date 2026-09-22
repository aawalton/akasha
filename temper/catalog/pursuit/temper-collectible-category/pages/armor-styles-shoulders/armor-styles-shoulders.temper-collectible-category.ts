import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const armorStylesShoulders = {
  id: "01a06165-9166-7003-9b22-b97e6b857baf",
  type: "page-type/temper-collectible-category",
  slug: "armor-styles-shoulders",
  title: "Shoulders",
  parent: "temper-collectible-category/armor-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
