import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const apothecarysLedger = {
  id: "01a0d5f2-db25-73cf-aac9-84a54d99ce69",
  type: "page-type/temper-lore-book",
  slug: "apothecarys-ledger",
  title: "Apothecary's Ledger",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1383,
  bookIndex: 49,
  charted: true,
  quest: 4624,
  positions: "jsonl",
} as const satisfies TemperLoreBook
