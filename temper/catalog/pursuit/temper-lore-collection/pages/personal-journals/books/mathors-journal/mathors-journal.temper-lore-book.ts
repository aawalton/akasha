import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mathorsJournal = {
  id: "01a0d5f4-6f1b-7317-9953-aceb1cc31bb4",
  type: "page-type/temper-lore-book",
  slug: "mathors-journal",
  title: "Mathor's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 339,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
