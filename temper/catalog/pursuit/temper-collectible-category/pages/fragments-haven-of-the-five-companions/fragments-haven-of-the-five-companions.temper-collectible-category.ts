import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsHavenOfTheFiveCompanions = {
  id: "01a06165-9167-7014-be98-6c874d409160",
  type: "page-type/temper-collectible-category",
  slug: "fragments-haven-of-the-five-companions",
  title: "Haven of the Five Companions",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
