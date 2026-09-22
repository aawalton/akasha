import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsDeadlandsScorcher = {
  id: "01a06165-9167-7011-b7e1-e10c9b56ffee",
  type: "page-type/temper-collectible-category",
  slug: "fragments-deadlands-scorcher",
  title: "Deadlands Scorcher",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
