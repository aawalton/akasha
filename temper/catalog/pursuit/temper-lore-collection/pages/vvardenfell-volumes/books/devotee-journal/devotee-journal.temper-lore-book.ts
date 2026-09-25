import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const devoteeJournal = {
  id: "01a0d5f7-aa98-7a42-8e7b-d3a97af47eaf",
  type: "page-type/temper-lore-book",
  slug: "devotee-journal",
  title: "Devotee Journal",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 3979,
  bookIndex: 98,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
