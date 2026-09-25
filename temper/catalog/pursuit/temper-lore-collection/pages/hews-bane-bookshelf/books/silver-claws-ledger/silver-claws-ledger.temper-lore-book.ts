import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const silverClawsLedger = {
  id: "01a0d5f7-4294-767b-94be-1f6fa8309696",
  type: "page-type/temper-lore-book",
  slug: "silver-claws-ledger",
  title: "Silver-Claw's Ledger",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3410,
  bookIndex: 40,
  charted: true,
  quest: 5534,
  positions: "jsonl",
} as const satisfies TemperLoreBook
