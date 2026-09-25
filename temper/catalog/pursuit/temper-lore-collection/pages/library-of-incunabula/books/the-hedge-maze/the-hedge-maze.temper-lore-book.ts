import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHedgeMaze = {
  id: "01a0d5f8-02f9-70c5-8ece-842268652e70",
  type: "page-type/temper-lore-book",
  slug: "the-hedge-maze",
  title: "The Hedge Maze",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5039,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
