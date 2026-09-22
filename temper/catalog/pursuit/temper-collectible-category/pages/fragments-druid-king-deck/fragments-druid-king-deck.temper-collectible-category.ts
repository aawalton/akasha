import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsDruidKingDeck = {
  id: "01a06165-9167-7013-9b81-4cdb285da6db",
  type: "page-type/temper-collectible-category",
  slug: "fragments-druid-king-deck",
  title: "Druid King Deck",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
