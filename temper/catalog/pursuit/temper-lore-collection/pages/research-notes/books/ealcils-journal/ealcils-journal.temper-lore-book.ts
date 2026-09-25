import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ealcilsJournal = {
  id: "01a0d5f5-1384-7505-b2f9-559d8c8c0481",
  type: "page-type/temper-lore-book",
  slug: "ealcils-journal",
  title: "Ealcil's Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1586,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
