import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seriensFurtherOrders = {
  id: "01a0d5f3-7054-750d-826b-3a6fec923592",
  type: "page-type/temper-lore-book",
  slug: "seriens-further-orders",
  title: "Serien's Further Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 309,
  bookIndex: 10,
  charted: true,
  quest: 3583,
  positions: "jsonl",
} as const satisfies TemperLoreBook
