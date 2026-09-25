import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersNorvulkRuins = {
  id: "01a0d5f2-253b-79ef-bda1-11ba3e6812f6",
  type: "page-type/temper-lore-book",
  slug: "orders-norvulk-ruins",
  title: "Orders: Norvulk Ruins",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 93,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
