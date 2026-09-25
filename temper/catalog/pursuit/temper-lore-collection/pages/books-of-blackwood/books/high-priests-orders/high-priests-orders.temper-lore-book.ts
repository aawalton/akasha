import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const highPriestsOrders = {
  id: "01a0d60b-fdb0-7e8c-8015-e9eb6e0a12a5",
  type: "page-type/temper-lore-book",
  slug: "high-priests-orders",
  title: "High Priest's Orders",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6515,
  bookIndex: 17,
  charted: true,
  quest: 6616,
  positions: "jsonl",
} as const satisfies TemperLoreBook
