import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const upgradeGeneral = {
  id: "01a06165-916a-701a-80ce-96350a79394a",
  type: "page-type/temper-collectible-category",
  slug: "upgrade-general",
  title: "General",
  parent: "temper-collectible-category/upgrade",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
