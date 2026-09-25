import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kingFarangelsBeerBallad = {
  id: "01a0d5f6-1c16-77a8-9945-e0fde243b3a9",
  type: "page-type/temper-lore-book",
  slug: "king-farangels-beer-ballad",
  title: "King Farangel's Beer Ballad",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1102,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
