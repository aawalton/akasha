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
  createdAt: "2026-09-25T00:29:19.227Z",
  updatedAt: "2026-09-25T00:29:21.000Z",
} as const satisfies TemperLoreBook
