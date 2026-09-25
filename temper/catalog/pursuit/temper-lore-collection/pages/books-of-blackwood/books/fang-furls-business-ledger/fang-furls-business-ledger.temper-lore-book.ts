import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fangFurlsBusinessLedger = {
  id: "01a0d60b-fdaf-7e25-973d-1cf783386446",
  type: "page-type/temper-lore-book",
  slug: "fang-furls-business-ledger",
  title: "Fang-Furls' Business Ledger",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6693,
  bookIndex: 49,
  charted: true,
  quest: 6658,
  positions: "jsonl",
} as const satisfies TemperLoreBook
