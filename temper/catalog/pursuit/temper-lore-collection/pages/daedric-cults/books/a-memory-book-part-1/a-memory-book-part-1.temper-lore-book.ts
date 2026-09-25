import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aMemoryBookPart1 = {
  id: "01a0d5f2-253a-77a5-9146-d82adfe7d22d",
  type: "page-type/temper-lore-book",
  slug: "a-memory-book-part-1",
  title: "A Memory Book, Part 1",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 3134,
  bookIndex: 89,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
