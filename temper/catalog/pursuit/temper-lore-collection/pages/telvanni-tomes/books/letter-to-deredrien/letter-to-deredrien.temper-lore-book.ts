import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToDeredrien = {
  id: "01a0d60c-eb9b-72f0-a0e5-a1dfc2220548",
  type: "page-type/temper-lore-book",
  slug: "letter-to-deredrien",
  title: "Letter to Deredrien",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7567,
  bookIndex: 72,
  charted: true,
  quest: 7017,
  positions: "jsonl",
} as const satisfies TemperLoreBook
