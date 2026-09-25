import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDangersOfTruth = {
  id: "01a0d60d-156e-7560-b5ca-4731b968d9a4",
  type: "page-type/temper-lore-book",
  slug: "the-dangers-of-truth",
  title: "The Dangers of Truth",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7436,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
