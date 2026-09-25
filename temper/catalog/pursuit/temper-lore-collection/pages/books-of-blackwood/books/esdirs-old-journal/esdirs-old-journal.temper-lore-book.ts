import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const esdirsOldJournal = {
  id: "01a0d60b-fdaf-7d95-96a1-f39d80e8eee0",
  type: "page-type/temper-lore-book",
  slug: "esdirs-old-journal",
  title: "Esdir's Old Journal",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6456,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
