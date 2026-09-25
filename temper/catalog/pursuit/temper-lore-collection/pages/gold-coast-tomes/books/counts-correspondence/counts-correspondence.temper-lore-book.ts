import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const countsCorrespondence = {
  id: "01a0d5f7-73f9-7b35-8b81-e479950d8ce7",
  type: "page-type/temper-lore-book",
  slug: "counts-correspondence",
  title: "Count's Correspondence",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3740,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
