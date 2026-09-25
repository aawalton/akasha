import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const risasJournal = {
  id: "01a0d5f6-45ae-7c74-94cf-a4ca7bddbbf2",
  type: "page-type/temper-lore-book",
  slug: "risas-journal",
  title: "Risa's Journal",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1063,
  bookIndex: 21,
  charted: true,
  quest: 3728,
  positions: "jsonl",
} as const satisfies TemperLoreBook
