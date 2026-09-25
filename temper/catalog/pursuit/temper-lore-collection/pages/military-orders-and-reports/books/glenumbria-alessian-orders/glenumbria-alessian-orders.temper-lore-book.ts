import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const glenumbriaAlessianOrders = {
  id: "01a0d5f3-7053-7bab-b3fe-c8c2ef259bbc",
  type: "page-type/temper-lore-book",
  slug: "glenumbria-alessian-orders",
  title: "Glenumbria: Alessian Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1171,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
