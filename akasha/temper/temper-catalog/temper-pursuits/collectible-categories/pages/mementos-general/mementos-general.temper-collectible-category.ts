import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mementosGeneral = {
  id: "01a06165-9169-7006-90e7-6a91f2bd1a74",
  pageTypeSlug: "temper-collectible-category",
  slug: "mementos-general",
  title: "General",
  parent: "mementos",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
