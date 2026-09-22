import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsSpecial = {
  id: "01a06165-916a-7002-b9b6-e1d95941e4c4",
  type: "page-type/temper-collectible-category",
  slug: "mounts-special",
  title: "Special",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
