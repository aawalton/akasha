import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGuiseOfWoodcutter = {
  id: "01a0d5f2-509f-776c-8b1d-3bb214940e50",
  type: "page-type/temper-lore-book",
  slug: "the-guise-of-woodcutter",
  title: "The Guise of Woodcutter",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2245,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
