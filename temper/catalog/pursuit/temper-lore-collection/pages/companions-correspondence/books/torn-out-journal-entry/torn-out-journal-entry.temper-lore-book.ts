import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tornOutJournalEntry = {
  id: "01a0d60d-bbe4-790e-95b4-4f1f62c4df2a",
  type: "page-type/temper-lore-book",
  slug: "torn-out-journal-entry",
  title: "Torn Out Journal Entry",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8220,
  bookIndex: 25,
  charted: true,
  quest: 7189,
  positions: "jsonl",
} as const satisfies TemperLoreBook
