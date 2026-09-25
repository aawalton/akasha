import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theChroniclesOfKingKurogBookI = {
  id: "01a0d5f6-d68b-7e2f-b70c-251e2cd6cd87",
  type: "page-type/temper-lore-book",
  slug: "the-chronicles-of-king-kurog-book-i",
  title: "The Chronicles of King Kurog, Book I",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3002,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
