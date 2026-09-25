import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersAreOrders = {
  id: "01a0d5f1-f451-7e86-ad06-41e9691a1eac",
  type: "page-type/temper-lore-book",
  slug: "orders-are-orders",
  title: "Orders are Orders",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 736,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
