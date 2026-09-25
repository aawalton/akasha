import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const neronnirsJournal = {
  id: "01a0d5f5-abba-7cc4-a619-61f94fb24cec",
  type: "page-type/temper-lore-book",
  slug: "neronnirs-journal",
  title: "Neronnir's Journal",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2119,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
