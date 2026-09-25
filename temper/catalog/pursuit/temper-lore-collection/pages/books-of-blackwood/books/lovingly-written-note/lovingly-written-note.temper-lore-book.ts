import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lovinglyWrittenNote = {
  id: "01a0d60b-fdb0-7f44-99a9-3d5f9726d123",
  type: "page-type/temper-lore-book",
  slug: "lovingly-written-note",
  title: "Lovingly Written Note",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6452,
  bookIndex: 33,
  charted: true,
  quest: 6623,
  positions: "jsonl",
} as const satisfies TemperLoreBook
