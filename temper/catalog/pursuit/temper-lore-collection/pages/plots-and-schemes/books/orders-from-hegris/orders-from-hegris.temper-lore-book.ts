import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersFromHegris = {
  id: "01a0d5f4-c389-724a-9b08-f7d051cb592b",
  type: "page-type/temper-lore-book",
  slug: "orders-from-hegris",
  title: "Orders from Hegris",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1937,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
