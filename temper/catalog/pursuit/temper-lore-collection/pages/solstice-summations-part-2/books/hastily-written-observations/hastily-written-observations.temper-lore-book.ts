import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hastilyWrittenObservations = {
  id: "01a0d60e-45b2-7ad1-b688-f78f38d9aee0",
  type: "page-type/temper-lore-book",
  slug: "hastily-written-observations",
  title: "Hastily Written Observations",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8582,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
