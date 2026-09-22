import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsVvardvarks = {
  id: "01a06165-916a-7006-8c25-0410186b4e75",
  type: "page-type/temper-collectible-category",
  slug: "mounts-vvardvarks",
  title: "Vvardvarks",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
