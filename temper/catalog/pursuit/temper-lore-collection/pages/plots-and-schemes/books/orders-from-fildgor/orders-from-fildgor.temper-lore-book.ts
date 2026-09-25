import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersFromFildgor = {
  id: "01a0d5f4-c388-79b8-8df1-3b82000e1e3b",
  type: "page-type/temper-lore-book",
  slug: "orders-from-fildgor",
  title: "Orders from Fildgor",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 338,
  bookIndex: 4,
  charted: true,
  quest: 4060,
  positions: "jsonl",
} as const satisfies TemperLoreBook
