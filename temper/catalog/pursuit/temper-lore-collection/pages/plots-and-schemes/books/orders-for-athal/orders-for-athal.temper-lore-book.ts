import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersForAthal = {
  id: "01a0d5f4-c388-7a3e-a4ed-99cbabe2df1a",
  type: "page-type/temper-lore-book",
  slug: "orders-for-athal",
  title: "Orders for Athal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1943,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
