import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sailingOrders = {
  id: "01a0d60c-75b6-747a-99e1-197af7d9ee08",
  type: "page-type/temper-lore-book",
  slug: "sailing-orders",
  title: "Sailing Orders",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7024,
  bookIndex: 35,
  charted: true,
  quest: 6765,
  positions: "jsonl",
} as const satisfies TemperLoreBook
