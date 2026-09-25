import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lirendelsFamilyShrine = {
  id: "01a0d60a-d5bd-74d5-b425-c31f02c91659",
  type: "page-type/temper-lore-book",
  slug: "lirendels-family-shrine",
  title: "Lirendel's Family Shrine",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4882,
  bookIndex: 81,
  charted: true,
  quest: 6151,
  positions: "jsonl",
} as const satisfies TemperLoreBook
