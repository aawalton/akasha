import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const upgradeScribing = {
  id: "01a06165-916a-701d-9d17-d63b4405cac3",
  type: "page-type/temper-collectible-category",
  slug: "upgrade-scribing",
  title: "Scribing",
  parent: "temper-collectible-category/upgrade",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
