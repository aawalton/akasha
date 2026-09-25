import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const uryaamosJournal = {
  id: "01a0d5f5-1386-78a6-9895-68d320089258",
  type: "page-type/temper-lore-book",
  slug: "uryaamos-journal",
  title: "Uryaamo's Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 945,
  bookIndex: 35,
  charted: true,
  quest: 4339,
  positions: "jsonl",
} as const satisfies TemperLoreBook
