import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsUrsauks = {
  id: "01a06165-916a-7005-989b-fe3858c9f637",
  type: "page-type/temper-collectible-category",
  slug: "mounts-ursauks",
  title: "Ursauks",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
