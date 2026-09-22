import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsRams = {
  id: "01a06165-916a-7000-8014-eb1ef20e60c2",
  type: "page-type/temper-collectible-category",
  slug: "mounts-rams",
  title: "Rams",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
