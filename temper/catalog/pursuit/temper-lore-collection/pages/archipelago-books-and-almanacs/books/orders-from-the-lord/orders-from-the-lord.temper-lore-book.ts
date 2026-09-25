import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersFromTheLord = {
  id: "01a0d60c-baf3-7c30-bbbe-39199cb3e981",
  type: "page-type/temper-lore-book",
  slug: "orders-from-the-lord",
  title: "Orders from the Lord",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7287,
  bookIndex: 7,
  charted: true,
  quest: 6847,
  positions: "jsonl",
} as const satisfies TemperLoreBook
