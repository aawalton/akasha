import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anotherLetterFromTheReformer = {
  id: "01a0d60c-eb9a-7067-83c8-9aadc981c8c9",
  type: "page-type/temper-lore-book",
  slug: "another-letter-from-the-reformer",
  title: "Another Letter from the Reformer",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7689,
  bookIndex: 84,
  charted: true,
  quest: 7018,
  positions: "jsonl",
} as const satisfies TemperLoreBook
