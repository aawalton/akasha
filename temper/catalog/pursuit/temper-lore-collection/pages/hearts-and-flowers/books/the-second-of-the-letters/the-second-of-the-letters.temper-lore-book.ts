import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSecondOfTheLetters = {
  id: "01a0d5f2-af70-7b22-9f13-ee0458f6391e",
  type: "page-type/temper-lore-book",
  slug: "the-second-of-the-letters",
  title: "The Second of the Letters",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 986,
  bookIndex: 27,
  charted: true,
  quest: 4387,
  positions: "jsonl",
} as const satisfies TemperLoreBook
