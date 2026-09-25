import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gordagsJournal = {
  id: "01a0d5f2-509e-7657-bcab-00219b3aa7d6",
  type: "page-type/temper-lore-book",
  slug: "gordags-journal",
  title: "Gordag's Journal",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1261,
  bookIndex: 28,
  charted: true,
  quest: 4556,
  positions: "jsonl",
} as const satisfies TemperLoreBook
