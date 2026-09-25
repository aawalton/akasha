import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLastOfTheLetters = {
  id: "01a0d5f2-af70-735f-ae66-a6538a6abca1",
  type: "page-type/temper-lore-book",
  slug: "the-last-of-the-letters",
  title: "The Last of the Letters",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 987,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
