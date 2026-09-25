import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRemnantTruth = {
  id: "01a0d60d-156e-7b44-ac88-79c0dac6ca6b",
  type: "page-type/temper-lore-book",
  slug: "the-remnant-truth",
  title: "The Remnant Truth",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7773,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
