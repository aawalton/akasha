import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const furnishingsUndauntedTrophies = {
  id: "01a06165-9169-7000-8a9d-89d9061ecdc9",
  type: "page-type/temper-collectible-category",
  slug: "furnishings-undaunted-trophies",
  title: "Undaunted Trophies",
  parent: "temper-collectible-category/furnishings",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
