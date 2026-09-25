import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aPerfectScore = {
  id: "01a0d5f1-f450-7f12-9c64-e3390cc3a12b",
  type: "page-type/temper-lore-book",
  slug: "a-perfect-score",
  title: "A Perfect Score",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 604,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
