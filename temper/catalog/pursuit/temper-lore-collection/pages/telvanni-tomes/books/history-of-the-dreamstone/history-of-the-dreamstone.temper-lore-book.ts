import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const historyOfTheDreamstone = {
  id: "01a0d60c-eb9b-752b-a2e6-ef757cf8d28b",
  type: "page-type/temper-lore-book",
  slug: "history-of-the-dreamstone",
  title: "History of the Dreamstone",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7590,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
