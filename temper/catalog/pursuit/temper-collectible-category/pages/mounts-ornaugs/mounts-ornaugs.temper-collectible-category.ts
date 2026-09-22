import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsOrnaugs = {
  id: "01a06165-9169-7015-8ad6-4e9b54c55f74",
  type: "page-type/temper-collectible-category",
  slug: "mounts-ornaugs",
  title: "Ornaugs",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
