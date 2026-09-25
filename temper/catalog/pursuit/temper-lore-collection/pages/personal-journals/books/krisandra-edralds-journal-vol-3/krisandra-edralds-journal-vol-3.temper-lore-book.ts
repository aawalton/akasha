import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const krisandraEdraldsJournalVol3 = {
  id: "01a0d5f4-6f1a-7bd5-800b-54a9dbe81365",
  type: "page-type/temper-lore-book",
  slug: "krisandra-edralds-journal-vol-3",
  title: "Krisandra Edrald's Journal, Vol. 3",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2150,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
