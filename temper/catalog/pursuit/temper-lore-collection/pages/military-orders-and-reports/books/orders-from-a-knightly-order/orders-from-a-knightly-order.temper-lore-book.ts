import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersFromAKnightlyOrder = {
  id: "01a0d5f3-7053-7d68-abd5-03b401554411",
  type: "page-type/temper-lore-book",
  slug: "orders-from-a-knightly-order",
  title: "Orders from a Knightly Order",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 111,
  bookIndex: 5,
  charted: true,
  quest: 4864,
  positions: "jsonl",
} as const satisfies TemperLoreBook
