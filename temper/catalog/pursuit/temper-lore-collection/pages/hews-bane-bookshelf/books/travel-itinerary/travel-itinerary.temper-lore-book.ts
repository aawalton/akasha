import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const travelItinerary = {
  id: "01a0d5f7-4294-7f91-a4f9-cd33d30f67d6",
  type: "page-type/temper-lore-book",
  slug: "travel-itinerary",
  title: "Travel Itinerary",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3337,
  bookIndex: 58,
  charted: true,
  quest: 5570,
  positions: "jsonl",
} as const satisfies TemperLoreBook
