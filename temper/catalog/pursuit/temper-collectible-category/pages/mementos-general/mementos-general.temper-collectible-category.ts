import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mementosGeneral = {
  id: "01a06165-9169-7006-90e7-6a91f2bd1a74",
  type: "page-type/temper-collectible-category",
  slug: "mementos-general",
  title: "General",
  parent: "temper-collectible-category/mementos",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
