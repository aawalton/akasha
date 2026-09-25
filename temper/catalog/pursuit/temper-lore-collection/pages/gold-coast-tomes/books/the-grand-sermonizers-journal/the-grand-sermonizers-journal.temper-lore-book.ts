import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGrandSermonizersJournal = {
  id: "01a0d5f7-73fb-7d90-a68c-149dd9ce9011",
  type: "page-type/temper-lore-book",
  slug: "the-grand-sermonizers-journal",
  title: "The Grand Sermonizer's Journal",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3738,
  bookIndex: 82,
  charted: true,
  quest: 5595,
  positions: "jsonl",
} as const satisfies TemperLoreBook
