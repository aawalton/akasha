import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const experimentJournal = {
  id: "01a0d5f5-1384-7c41-8f4f-d47c027cfb84",
  type: "page-type/temper-lore-book",
  slug: "experiment-journal",
  title: "Experiment Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1609,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
