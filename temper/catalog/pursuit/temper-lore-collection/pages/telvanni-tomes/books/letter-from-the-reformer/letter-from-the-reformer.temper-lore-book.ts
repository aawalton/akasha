import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromTheReformer = {
  id: "01a0d60c-eb9b-7810-8710-630cda05187a",
  type: "page-type/temper-lore-book",
  slug: "letter-from-the-reformer",
  title: "Letter from the Reformer",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7687,
  bookIndex: 82,
  charted: true,
  quest: 7017,
  positions: "jsonl",
} as const satisfies TemperLoreBook
