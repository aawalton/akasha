import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gavosItinerary = {
  id: "01a0d5f2-db26-76bf-85e7-67bccf69c544",
  type: "page-type/temper-lore-book",
  slug: "gavos-itinerary",
  title: "Gavo's Itinerary",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1408,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
