import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notableTransactions = {
  id: "01a0d5f1-f451-7b1e-a52a-251dd905a8e9",
  type: "page-type/temper-lore-book",
  slug: "notable-transactions",
  title: "Notable Transactions",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1558,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
