import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const upgradeCompanionKeepsakes = {
  id: "01a06165-916a-7019-b3f0-c938f9cb932e",
  type: "page-type/temper-collectible-category",
  slug: "upgrade-companion-keepsakes",
  title: "Companion Keepsakes",
  parent: "temper-collectible-category/upgrade",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
