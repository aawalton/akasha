import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const deregorsLostGoods = {
  id: "01a0d5f2-db25-73ae-ac39-98971893a746",
  type: "page-type/temper-lore-book",
  slug: "deregors-lost-goods",
  title: "Deregor's Lost Goods",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1304,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
