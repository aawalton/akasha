import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mzumsJournal = {
  id: "01a0d60b-2345-7840-a21b-266cb008caa0",
  type: "page-type/temper-lore-book",
  slug: "mzums-journal",
  title: "M'zum's Journal",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5406,
  bookIndex: 18,
  charted: true,
  quest: 6325,
  positions: "jsonl",
} as const satisfies TemperLoreBook
