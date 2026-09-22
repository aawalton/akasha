import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const upgradeOutfitStyles = {
  id: "01a06165-916a-701c-985e-607864374e00",
  type: "page-type/temper-collectible-category",
  slug: "upgrade-outfit-styles",
  title: "Outfit Styles",
  parent: "temper-collectible-category/upgrade",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
