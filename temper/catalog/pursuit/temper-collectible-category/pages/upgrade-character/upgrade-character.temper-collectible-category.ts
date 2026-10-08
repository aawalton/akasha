import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const upgradeCharacter = {
  id: "01a06165-916a-7018-8e8b-52066284e9e6",
  type: "page-type/temper-collectible-category",
  slug: "upgrade-character",
  title: "Character",
  parent: "temper-collectible-category/upgrade",
  collectibles: "jsonl",
  createdAt: "2026-09-02T09:14:01.450Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperCollectibleCategory
