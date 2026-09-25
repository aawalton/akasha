import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const enakDosLedger = {
  id: "01a0d5f2-db26-7f78-b0ba-ac5345756fd1",
  type: "page-type/temper-lore-book",
  slug: "enak-dos-ledger",
  title: "Enak-do's Ledger",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1453,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
