import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsSovereignSow = {
  id: "01a06165-9168-7012-9ce5-867d4453d1c3",
  type: "page-type/temper-collectible-category",
  slug: "fragments-sovereign-sow",
  title: "Sovereign Sow",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
