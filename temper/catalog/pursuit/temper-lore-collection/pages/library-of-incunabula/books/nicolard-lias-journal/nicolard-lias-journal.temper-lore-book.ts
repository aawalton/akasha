import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nicolardLiasJournal = {
  id: "01a0d5f8-02f9-7d07-a451-cf616eb61819",
  type: "page-type/temper-lore-book",
  slug: "nicolard-lias-journal",
  title: "Nicolard Lia's Journal",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 4616,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
