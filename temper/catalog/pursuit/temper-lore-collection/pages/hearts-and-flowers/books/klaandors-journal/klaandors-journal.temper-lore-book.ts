import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const klaandorsJournal = {
  id: "01a0d5f2-af70-7e0b-bbcb-98bad8ecb90e",
  type: "page-type/temper-lore-book",
  slug: "klaandors-journal",
  title: "Klaandor's Journal",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 2001,
  bookIndex: 58,
  charted: true,
  quest: 4956,
  positions: "jsonl",
} as const satisfies TemperLoreBook
