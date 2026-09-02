import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsSpecial = {
  id: "01a06165-916a-7002-b9b6-e1d95941e4c4",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-special",
  title: "Special",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
