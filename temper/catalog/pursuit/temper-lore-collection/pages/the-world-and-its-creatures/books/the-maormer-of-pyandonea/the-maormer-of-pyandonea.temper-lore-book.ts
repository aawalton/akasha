import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMaormerOfPyandonea = {
  id: "01a0d5f5-f3e5-78f1-b0b3-5a3a3336eba4",
  type: "page-type/temper-lore-book",
  slug: "the-maormer-of-pyandonea",
  title: "The Maormer of Pyandonea",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 543,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
