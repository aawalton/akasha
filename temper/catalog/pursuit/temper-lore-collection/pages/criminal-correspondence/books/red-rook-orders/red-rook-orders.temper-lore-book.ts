import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const redRookOrders = {
  id: "01a0d5f1-f451-75a1-8e2c-1d20919c00f1",
  type: "page-type/temper-lore-book",
  slug: "red-rook-orders",
  title: "Red Rook Orders",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 81,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
