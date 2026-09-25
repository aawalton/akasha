import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ruurifinsJournalEntry1 = {
  id: "01a0d5f5-1385-7df9-9831-494cafd1a8d8",
  type: "page-type/temper-lore-book",
  slug: "ruurifins-journal-entry-1",
  title: "Ruurifin's Journal, Entry 1",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 944,
  bookIndex: 34,
  charted: true,
  quest: 4339,
  positions: "jsonl",
} as const satisfies TemperLoreBook
