import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const upgradeInfiniteArchive = {
  id: "01a06165-916a-701b-a353-849f25665e22",
  type: "page-type/temper-collectible-category",
  slug: "upgrade-infinite-archive",
  title: "Infinite Archive",
  parent: "temper-collectible-category/upgrade",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
