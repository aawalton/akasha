import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sumirilsBookPassage1 = {
  id: "01a0d5f5-7767-7c24-8f7c-039a0665a8ec",
  type: "page-type/temper-lore-book",
  slug: "sumirils-book-passage-1",
  title: "Sumiril's Book, Passage 1",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1725,
  bookIndex: 75,
  charted: true,
  quest: 4792,
  positions: "jsonl",
} as const satisfies TemperLoreBook
