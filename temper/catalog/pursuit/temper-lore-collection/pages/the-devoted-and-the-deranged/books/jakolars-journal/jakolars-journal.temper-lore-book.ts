import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const jakolarsJournal = {
  id: "01a0d5f5-abba-7848-83fc-f5df0bb432b6",
  type: "page-type/temper-lore-book",
  slug: "jakolars-journal",
  title: "Jakolar's Journal",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2090,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
