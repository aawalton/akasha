import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWolfOfSolitude = {
  id: "01a0d60b-8109-7ec9-b2dd-5f435f7e45f0",
  type: "page-type/temper-lore-book",
  slug: "the-wolf-of-solitude",
  title: "The Wolf of Solitude",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6228,
  bookIndex: 53,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 38, mapCount: 3 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
