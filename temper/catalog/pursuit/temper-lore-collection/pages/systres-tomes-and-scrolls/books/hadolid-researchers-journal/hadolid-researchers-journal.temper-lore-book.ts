import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hadolidResearchersJournal = {
  id: "01a0d60c-75b5-7ef1-93b8-d0c92df756a0",
  type: "page-type/temper-lore-book",
  slug: "hadolid-researchers-journal",
  title: "Hadolid Researcher's Journal",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7280,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
