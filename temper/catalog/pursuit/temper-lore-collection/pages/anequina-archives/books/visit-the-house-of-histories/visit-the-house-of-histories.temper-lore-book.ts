import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const visitTheHouseOfHistories = {
  id: "01a0d60b-2346-7374-9c08-6087f52aa086",
  type: "page-type/temper-lore-book",
  slug: "visit-the-house-of-histories",
  title: "Visit the House of Histories!",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5457,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
