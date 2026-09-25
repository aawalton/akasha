import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const skyAndStorm = {
  id: "01a0d5f6-1c16-72f6-8c4a-8bac1e0bde6b",
  type: "page-type/temper-lore-book",
  slug: "sky-and-storm",
  title: "Sky and Storm",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1403,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
