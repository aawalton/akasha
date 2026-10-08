import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBookOfMemories = {
  id: "01a0d5f4-07b9-74a0-8bc1-bf9d10f836d8",
  type: "page-type/temper-lore-book",
  slug: "the-book-of-memories",
  title: "The Book of Memories",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1410,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:25:34.905Z",
  updatedAt: "2026-09-25T00:25:37.000Z",
} as const satisfies TemperLoreBook
