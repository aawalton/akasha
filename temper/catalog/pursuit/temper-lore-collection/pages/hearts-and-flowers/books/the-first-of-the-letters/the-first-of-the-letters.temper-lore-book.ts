import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFirstOfTheLetters = {
  id: "01a0d5f2-af70-75b3-aed9-22fe849af853",
  type: "page-type/temper-lore-book",
  slug: "the-first-of-the-letters",
  title: "The First of the Letters",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 985,
  bookIndex: 26,
  charted: true,
  quest: 4387,
  positions: "jsonl",
} as const satisfies TemperLoreBook
