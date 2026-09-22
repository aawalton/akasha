import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsWolves = {
  id: "01a06165-916a-7008-9c1b-c4bbf58efc6c",
  type: "page-type/temper-collectible-category",
  slug: "mounts-wolves",
  title: "Wolves",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
