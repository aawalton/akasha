import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBlackDragonsJournal = {
  id: "01a0d5f7-73fa-7f75-a421-5016a47c5e16",
  type: "page-type/temper-lore-book",
  slug: "the-black-dragons-journal",
  title: "The Black Dragon's Journal",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3408,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
