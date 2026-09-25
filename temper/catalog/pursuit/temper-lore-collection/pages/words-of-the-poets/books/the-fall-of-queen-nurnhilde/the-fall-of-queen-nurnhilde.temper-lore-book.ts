import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFallOfQueenNurnhilde = {
  id: "01a0d5f6-1c16-7b8c-b7fd-577d9c56d774",
  type: "page-type/temper-lore-book",
  slug: "the-fall-of-queen-nurnhilde",
  title: "The Fall of Queen Nurnhilde",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 392,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
