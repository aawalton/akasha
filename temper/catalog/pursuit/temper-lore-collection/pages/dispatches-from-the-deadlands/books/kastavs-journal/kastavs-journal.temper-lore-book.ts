import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kastavsJournal = {
  id: "01a0d60c-40c0-7cc6-a482-3503c18dbfc2",
  type: "page-type/temper-lore-book",
  slug: "kastavs-journal",
  title: "Kastav's Journal",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6756,
  bookIndex: 30,
  charted: true,
  quest: 6705,
  positions: "jsonl",
} as const satisfies TemperLoreBook
