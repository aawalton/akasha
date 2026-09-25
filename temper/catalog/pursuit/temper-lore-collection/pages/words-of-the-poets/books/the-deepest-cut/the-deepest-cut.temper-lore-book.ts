import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDeepestCut = {
  id: "01a0d5f6-1c16-7696-86c7-0c8bd61b922b",
  type: "page-type/temper-lore-book",
  slug: "the-deepest-cut",
  title: "The Deepest Cut",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 937,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
