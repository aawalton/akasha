import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const upgradeCharacter = {
  id: "01a06165-916a-7018-8e8b-52066284e9e6",
  type: "page-type/temper-collectible-category",
  slug: "upgrade-character",
  title: "Character",
  parent: "temper-collectible-category/upgrade",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
