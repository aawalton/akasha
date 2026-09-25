import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const najansJournal = {
  id: "01a0d5f2-af70-7d78-abe1-cbe68d9a6c61",
  type: "page-type/temper-lore-book",
  slug: "najans-journal",
  title: "Najan's Journal",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 2045,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
