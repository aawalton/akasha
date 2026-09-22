import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsAlmalexiaDeck = {
  id: "01a06165-9167-7006-b832-5b8f2ac53a02",
  type: "page-type/temper-collectible-category",
  slug: "fragments-almalexia-deck",
  title: "Almalexia Deck",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
