import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToNarsis = {
  id: "01a0d5f3-0ef8-7dbc-999a-7fb2c6fa45d5",
  type: "page-type/temper-lore-book",
  slug: "letter-to-narsis",
  title: "Letter to Narsis",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2498,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
