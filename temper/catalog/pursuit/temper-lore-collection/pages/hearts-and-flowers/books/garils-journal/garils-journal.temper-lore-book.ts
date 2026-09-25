import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const garilsJournal = {
  id: "01a0d5f2-af70-7acf-a02c-5f73d59cb1aa",
  type: "page-type/temper-lore-book",
  slug: "garils-journal",
  title: "Garil's Journal",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 433,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
