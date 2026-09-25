import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const brigadinesJournal = {
  id: "01a0d60b-fdaf-78ae-aee7-7ad7f2a15b3b",
  type: "page-type/temper-lore-book",
  slug: "brigadines-journal",
  title: "Brigadine's Journal",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6739,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
