import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const emotesGeneral = {
  id: "01a06165-9167-7004-b5c7-db973a1dd3e3",
  type: "page-type/temper-collectible-category",
  slug: "emotes-general",
  title: "General",
  parent: "temper-collectible-category/emotes",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
