import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const damarsLedger = {
  id: "01a0d5f2-db25-7451-a8d1-16d35d18da88",
  type: "page-type/temper-lore-book",
  slug: "damars-ledger",
  title: "Damar's Ledger",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 2527,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
