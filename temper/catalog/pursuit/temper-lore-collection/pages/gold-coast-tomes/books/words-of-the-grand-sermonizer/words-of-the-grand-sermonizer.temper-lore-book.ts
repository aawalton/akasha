import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wordsOfTheGrandSermonizer = {
  id: "01a0d5f7-73fb-7f3f-9a7c-4d1e98e92c83",
  type: "page-type/temper-lore-book",
  slug: "words-of-the-grand-sermonizer",
  title: "Words of the Grand Sermonizer",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3696,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
