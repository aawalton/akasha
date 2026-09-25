import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lighthouseOrders = {
  id: "01a0d60c-75b5-7a53-aea5-92f40d5e7ae2",
  type: "page-type/temper-lore-book",
  slug: "lighthouse-orders",
  title: "Lighthouse Orders",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7200,
  bookIndex: 37,
  charted: true,
  quest: 6752,
  positions: "jsonl",
} as const satisfies TemperLoreBook
