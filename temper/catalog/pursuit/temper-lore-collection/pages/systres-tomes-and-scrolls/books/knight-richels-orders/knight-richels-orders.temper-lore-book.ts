import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const knightRichelsOrders = {
  id: "01a0d60c-75b5-7205-ad0c-8058c9306a0a",
  type: "page-type/temper-lore-book",
  slug: "knight-richels-orders",
  title: "Knight Richel's Orders",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 6969,
  bookIndex: 24,
  charted: true,
  quest: 6753,
  positions: "jsonl",
} as const satisfies TemperLoreBook
