import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsCrimsonIndrik = {
  id: "01a06165-9167-700c-acac-0d43e1d0753d",
  type: "page-type/temper-collectible-category",
  slug: "fragments-crimson-indrik",
  title: "Crimson Indrik",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
