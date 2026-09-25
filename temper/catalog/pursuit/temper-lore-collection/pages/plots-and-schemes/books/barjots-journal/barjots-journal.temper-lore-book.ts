import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const barjotsJournal = {
  id: "01a0d5f4-c383-74a7-be3b-efa736d71d91",
  type: "page-type/temper-lore-book",
  slug: "barjots-journal",
  title: "Barjot's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1345,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
