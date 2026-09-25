import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAssassinOfAlikr = {
  id: "01a0d5f5-7767-7d1a-8849-f6e40041d00c",
  type: "page-type/temper-lore-book",
  slug: "the-assassin-of-alikr",
  title: "The Assassin of Alik'r",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1361,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
