import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dragosOrders = {
  id: "01a0d5f3-7052-7dde-b045-c13dd7bce23d",
  type: "page-type/temper-lore-book",
  slug: "dragos-orders",
  title: "Drago's Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1378,
  bookIndex: 55,
  charted: true,
  quest: 4468,
  positions: "jsonl",
} as const satisfies TemperLoreBook
