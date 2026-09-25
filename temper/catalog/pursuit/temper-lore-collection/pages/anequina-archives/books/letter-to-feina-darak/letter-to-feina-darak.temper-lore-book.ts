import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToFeinaDarak = {
  id: "01a0d60b-2345-721f-b80f-9e00ce9ae09a",
  type: "page-type/temper-lore-book",
  slug: "letter-to-feina-darak",
  title: "Letter to Feina-Darak",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5396,
  bookIndex: 83,
  charted: true,
  quest: 6307,
  positions: "jsonl",
} as const satisfies TemperLoreBook
