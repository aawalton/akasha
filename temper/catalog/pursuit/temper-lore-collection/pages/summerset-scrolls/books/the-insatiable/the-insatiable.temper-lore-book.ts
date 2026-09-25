import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theInsatiable = {
  id: "01a0d60a-d5be-7667-b63a-a81d373dcdd4",
  type: "page-type/temper-lore-book",
  slug: "the-insatiable",
  title: "The Insatiable",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4797,
  bookIndex: 78,
  charted: true,
  quest: 6117,
  positions: "jsonl",
} as const satisfies TemperLoreBook
