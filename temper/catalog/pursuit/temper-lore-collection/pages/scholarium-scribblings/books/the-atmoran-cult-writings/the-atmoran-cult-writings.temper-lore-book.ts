import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAtmoranCultWritings = {
  id: "01a0d60d-9a64-74e4-847b-19ec25934c16",
  type: "page-type/temper-lore-book",
  slug: "the-atmoran-cult-writings",
  title: "The Atmoran Cult Writings",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8147,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
