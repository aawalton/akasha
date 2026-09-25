import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const grenettasJournal = {
  id: "01a0d60b-fdb0-712f-a7d4-02ee86d4066c",
  type: "page-type/temper-lore-book",
  slug: "grenettas-journal",
  title: "Grenetta's Journal",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6620,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
