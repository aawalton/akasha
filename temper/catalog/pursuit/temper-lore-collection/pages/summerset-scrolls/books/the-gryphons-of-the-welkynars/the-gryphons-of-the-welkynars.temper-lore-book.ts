import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGryphonsOfTheWelkynars = {
  id: "01a0d60a-d5be-703b-a796-6cec254c3958",
  type: "page-type/temper-lore-book",
  slug: "the-gryphons-of-the-welkynars",
  title: "The Gryphons of the Welkynars",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5053,
  bookIndex: 58,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
