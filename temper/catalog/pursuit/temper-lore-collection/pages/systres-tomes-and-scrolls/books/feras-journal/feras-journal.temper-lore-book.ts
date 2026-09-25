import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ferasJournal = {
  id: "01a0d60c-75b5-7a7a-8e0a-f811fd926fee",
  type: "page-type/temper-lore-book",
  slug: "feras-journal",
  title: "Fera's Journal",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7144,
  bookIndex: 5,
  charted: true,
  quest: 6780,
  positions: "jsonl",
} as const satisfies TemperLoreBook
