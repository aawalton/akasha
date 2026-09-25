import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const generalSeriensOrders = {
  id: "01a0d5f3-7053-758a-8895-79795c91e862",
  type: "page-type/temper-lore-book",
  slug: "general-seriens-orders",
  title: "General Serien's Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 308,
  bookIndex: 9,
  charted: true,
  quest: 3583,
  positions: "jsonl",
} as const satisfies TemperLoreBook
