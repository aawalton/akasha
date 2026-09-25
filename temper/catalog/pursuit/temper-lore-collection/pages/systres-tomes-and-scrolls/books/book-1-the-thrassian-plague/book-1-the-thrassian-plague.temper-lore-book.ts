import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const book1TheThrassianPlague = {
  id: "01a0d60c-75b4-72cc-967a-83b9b741c4fa",
  type: "page-type/temper-lore-book",
  slug: "book-1-the-thrassian-plague",
  title: "1. The Thrassian Plague",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7147,
  bookIndex: 8,
  charted: true,
  quest: 6796,
  positions: "jsonl",
} as const satisfies TemperLoreBook
