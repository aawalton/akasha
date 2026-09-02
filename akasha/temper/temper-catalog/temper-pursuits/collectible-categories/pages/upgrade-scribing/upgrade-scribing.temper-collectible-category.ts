import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const upgradeScribing = {
  id: "01a06165-916a-701d-9d17-d63b4405cac3",
  pageTypeSlug: "temper-collectible-category",
  slug: "upgrade-scribing",
  title: "Scribing",
  parent: "upgrade",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
