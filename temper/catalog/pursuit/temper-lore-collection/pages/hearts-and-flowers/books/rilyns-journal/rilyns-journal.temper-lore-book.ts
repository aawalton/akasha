import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rilynsJournal = {
  id: "01a0d5f2-af70-74a2-a501-adcb8492a154",
  type: "page-type/temper-lore-book",
  slug: "rilyns-journal",
  title: "Rilyn's Journal",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 658,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
