import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const barrowtonsJournal = {
  id: "01a0d5f6-45ad-7336-bab8-247fc779fc52",
  type: "page-type/temper-lore-book",
  slug: "barrowtons-journal",
  title: "Barrowton's Journal",
  collection: "temper-lore-collection/final-words",
  esoBookId: 2006,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
