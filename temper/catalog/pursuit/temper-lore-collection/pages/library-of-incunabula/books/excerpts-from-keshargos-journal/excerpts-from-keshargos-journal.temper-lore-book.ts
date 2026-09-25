import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const excerptsFromKeshargosJournal = {
  id: "01a0d5f8-02f8-7436-b7dd-f9816b09bc8d",
  type: "page-type/temper-lore-book",
  slug: "excerpts-from-keshargos-journal",
  title: "Excerpts from Keshargo's Journal",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7476,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
