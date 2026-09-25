import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCluesDamnYourEyes = {
  id: "01a0d5f4-07b9-7129-aa26-3b1d34937884",
  type: "page-type/temper-lore-book",
  slug: "the-clues-damn-your-eyes",
  title: "The Clues, Damn Your Eyes",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1059,
  bookIndex: 26,
  charted: true,
  quest: 4471,
  positions: "jsonl",
} as const satisfies TemperLoreBook
