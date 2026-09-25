import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const orderOfTheHour = {
  id: "01a0d5f7-73fa-7a0a-b9a0-80b0b8946e0b",
  type: "page-type/temper-lore-book",
  slug: "order-of-the-hour",
  title: "Order of the Hour",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3253,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
