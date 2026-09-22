import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsDeadlandsFirewalker = {
  id: "01a06165-9167-7010-90ee-1bc5ea235649",
  type: "page-type/temper-collectible-category",
  slug: "fragments-deadlands-firewalker",
  title: "Deadlands Firewalker",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
