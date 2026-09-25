import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const roostSmugglersLedger = {
  id: "01a0d5f2-db26-74e9-91b8-45eee2f60970",
  type: "page-type/temper-lore-book",
  slug: "roost-smugglers-ledger",
  title: "Roost Smuggler's Ledger",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1739,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
