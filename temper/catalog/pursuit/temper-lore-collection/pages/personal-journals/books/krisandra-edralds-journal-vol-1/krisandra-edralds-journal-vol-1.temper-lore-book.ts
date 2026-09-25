import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const krisandraEdraldsJournalVol1 = {
  id: "01a0d5f4-6f1a-7d53-99af-b6a7d256f373",
  type: "page-type/temper-lore-book",
  slug: "krisandra-edralds-journal-vol-1",
  title: "Krisandra Edrald's Journal, Vol. 1",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2152,
  bookIndex: 87,
  charted: true,
  quest: 5027,
  positions: "jsonl",
} as const satisfies TemperLoreBook
