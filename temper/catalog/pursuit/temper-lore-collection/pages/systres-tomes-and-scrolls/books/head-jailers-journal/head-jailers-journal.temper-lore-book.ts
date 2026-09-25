import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const headJailersJournal = {
  id: "01a0d60c-75b5-7a17-a69c-38a4ebc05659",
  type: "page-type/temper-lore-book",
  slug: "head-jailers-journal",
  title: "Head Jailer's Journal",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7034,
  bookIndex: 3,
  charted: true,
  quest: 6780,
  positions: "jsonl",
} as const satisfies TemperLoreBook
