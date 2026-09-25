import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const volsJournal = {
  id: "01a0d5f4-6f1b-7718-8a5a-e3ec71c14879",
  type: "page-type/temper-lore-book",
  slug: "vols-journal",
  title: "Vol's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2983,
  bookIndex: 98,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
