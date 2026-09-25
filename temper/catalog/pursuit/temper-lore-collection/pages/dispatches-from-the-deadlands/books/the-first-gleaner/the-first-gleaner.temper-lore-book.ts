import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFirstGleaner = {
  id: "01a0d60c-40c1-7e55-aa39-18c5e4fa9fc0",
  type: "page-type/temper-lore-book",
  slug: "the-first-gleaner",
  title: "The First Gleaner",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6919,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
