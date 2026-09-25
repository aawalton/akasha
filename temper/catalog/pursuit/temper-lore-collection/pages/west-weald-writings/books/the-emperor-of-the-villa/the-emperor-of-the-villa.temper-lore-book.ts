import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theEmperorOfTheVilla = {
  id: "01a0d60d-4ab0-7de7-a001-191e6793317d",
  type: "page-type/temper-lore-book",
  slug: "the-emperor-of-the-villa",
  title: "The Emperor of the Villa",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7782,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
