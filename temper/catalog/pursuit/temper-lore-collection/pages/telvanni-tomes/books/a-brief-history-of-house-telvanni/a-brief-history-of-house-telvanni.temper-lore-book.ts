import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aBriefHistoryOfHouseTelvanni = {
  id: "01a0d60c-eb9a-7d1c-9c03-5c0fc68d9737",
  type: "page-type/temper-lore-book",
  slug: "a-brief-history-of-house-telvanni",
  title: "A Brief History of House Telvanni",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7445,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
