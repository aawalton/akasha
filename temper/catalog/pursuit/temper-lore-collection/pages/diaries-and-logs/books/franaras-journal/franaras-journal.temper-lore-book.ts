import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const franarasJournal = {
  id: "01a0d5f2-509e-78bb-93a7-a44e3600d1fa",
  type: "page-type/temper-lore-book",
  slug: "franaras-journal",
  title: "Franara's Journal",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2480,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
