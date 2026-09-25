import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const destronsJournal = {
  id: "01a0d60b-fdaf-76e5-9f7f-ec0756efb0f2",
  type: "page-type/temper-lore-book",
  slug: "destrons-journal",
  title: "Destron's Journal",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6676,
  bookIndex: 1,
  charted: true,
  quest: 6630,
  positions: "jsonl",
} as const satisfies TemperLoreBook
