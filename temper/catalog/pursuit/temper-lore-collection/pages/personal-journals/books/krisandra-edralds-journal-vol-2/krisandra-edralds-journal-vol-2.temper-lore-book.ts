import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const krisandraEdraldsJournalVol2 = {
  id: "01a0d5f4-6f1a-7ba0-80df-165c29494e84",
  type: "page-type/temper-lore-book",
  slug: "krisandra-edralds-journal-vol-2",
  title: "Krisandra Edrald's Journal, Vol. 2",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2159,
  bookIndex: 88,
  charted: true,
  quest: 5027,
  positions: "jsonl",
} as const satisfies TemperLoreBook
