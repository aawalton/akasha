import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const patronsGeneral = {
  id: "01a06165-916a-7011-98fb-5ee37e0f812a",
  type: "page-type/temper-collectible-category",
  slug: "patrons-general",
  title: "General",
  parent: "temper-collectible-category/patrons",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
