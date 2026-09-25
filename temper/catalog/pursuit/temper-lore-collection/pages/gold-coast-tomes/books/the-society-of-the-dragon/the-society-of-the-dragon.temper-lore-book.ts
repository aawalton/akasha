import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSocietyOfTheDragon = {
  id: "01a0d5f7-73fb-79c1-aa2b-1734865b3b1c",
  type: "page-type/temper-lore-book",
  slug: "the-society-of-the-dragon",
  title: "The Society of the Dragon",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3534,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
