import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRingOfDaggers = {
  id: "01a0d5f3-3fdc-7a4c-9bc2-9e03b1a14725",
  type: "page-type/temper-lore-book",
  slug: "the-ring-of-daggers",
  title: "The Ring of Daggers",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1874,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
