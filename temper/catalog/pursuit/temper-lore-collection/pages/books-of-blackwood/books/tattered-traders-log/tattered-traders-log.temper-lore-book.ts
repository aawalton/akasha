import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tatteredTradersLog = {
  id: "01a0d60b-fdb1-7abe-b568-a548bc83f05e",
  type: "page-type/temper-lore-book",
  slug: "tattered-traders-log",
  title: "Tattered Trader's Log",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6450,
  bookIndex: 52,
  charted: true,
  quest: 6623,
  positions: "jsonl",
  createdAt: "2026-09-25T00:51:45.201Z",
  updatedAt: "2026-09-25T00:51:47.000Z",
} as const satisfies TemperLoreBook
