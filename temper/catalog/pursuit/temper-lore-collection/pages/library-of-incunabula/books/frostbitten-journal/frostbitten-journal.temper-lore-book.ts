import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const frostbittenJournal = {
  id: "01a0d5f8-02f8-7b9a-86c5-3d90993dccda",
  type: "page-type/temper-lore-book",
  slug: "frostbitten-journal",
  title: "Frostbitten Journal",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5182,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
