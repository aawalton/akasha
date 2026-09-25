import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fantosEpilionsJournal = {
  id: "01a0d5f7-73f9-7350-88fa-711332248540",
  type: "page-type/temper-lore-book",
  slug: "fantos-epilions-journal",
  title: "Fantos Epilion's Journal",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3706,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
