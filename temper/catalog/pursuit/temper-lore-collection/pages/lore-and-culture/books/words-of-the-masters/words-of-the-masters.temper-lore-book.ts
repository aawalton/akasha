import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wordsOfTheMasters = {
  id: "01a0d5f3-3fdc-73cf-adf0-98418956a0e0",
  type: "page-type/temper-lore-book",
  slug: "words-of-the-masters",
  title: "Words of the Masters",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1629,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
