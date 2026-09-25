import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const blueRoadScoutNotes = {
  id: "01a0d5f3-7052-706a-ae62-8594b42a0321",
  type: "page-type/temper-lore-book",
  slug: "blue-road-scout-notes",
  title: "Blue Road Scout Notes",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2240,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
