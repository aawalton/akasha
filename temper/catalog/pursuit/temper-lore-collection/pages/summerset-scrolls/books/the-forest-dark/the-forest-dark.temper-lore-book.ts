import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theForestDark = {
  id: "01a0d60a-d5be-7dc2-b754-93419bf93b97",
  type: "page-type/temper-lore-book",
  slug: "the-forest-dark",
  title: "The Forest Dark",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4996,
  bookIndex: 99,
  charted: true,
  quest: 6115,
  positions: "jsonl",
} as const satisfies TemperLoreBook
