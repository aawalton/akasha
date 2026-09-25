import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersFromTheChief = {
  id: "01a0d5f1-f451-7d1d-b7ef-03fec51fa018",
  type: "page-type/temper-lore-book",
  slug: "orders-from-the-chief",
  title: "Orders from the Chief",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 599,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
