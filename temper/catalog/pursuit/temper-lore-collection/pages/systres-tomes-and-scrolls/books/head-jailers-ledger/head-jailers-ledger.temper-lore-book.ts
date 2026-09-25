import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const headJailersLedger = {
  id: "01a0d60c-75b5-7979-9c1d-c95b32b28ff5",
  type: "page-type/temper-lore-book",
  slug: "head-jailers-ledger",
  title: "Head Jailer's Ledger",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7035,
  bookIndex: 4,
  charted: true,
  quest: 6780,
  positions: "jsonl",
} as const satisfies TemperLoreBook
