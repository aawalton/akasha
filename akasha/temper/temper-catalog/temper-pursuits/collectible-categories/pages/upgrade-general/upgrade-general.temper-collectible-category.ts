import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const upgradeGeneral = {
  id: "01a06165-916a-701a-80ce-96350a79394a",
  pageTypeSlug: "temper-collectible-category",
  slug: "upgrade-general",
  title: "General",
  parent: "upgrade",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
