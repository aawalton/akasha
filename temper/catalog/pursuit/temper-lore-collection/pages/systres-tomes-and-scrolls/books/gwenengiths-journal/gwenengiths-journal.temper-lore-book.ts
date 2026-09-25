import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gwenengithsJournal = {
  id: "01a0d60c-75b5-7c7b-8c47-1a551bf037e6",
  type: "page-type/temper-lore-book",
  slug: "gwenengiths-journal",
  title: "Gwenengith's Journal",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7207,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
