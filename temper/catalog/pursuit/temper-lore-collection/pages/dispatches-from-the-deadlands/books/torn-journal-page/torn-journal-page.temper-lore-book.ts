import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tornJournalPage = {
  id: "01a0d60c-40c1-788b-81d1-8f12cff19c08",
  type: "page-type/temper-lore-book",
  slug: "torn-journal-page",
  title: "Torn Journal Page",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6923,
  bookIndex: 24,
  charted: true,
  quest: 6706,
  positions: "jsonl",
} as const satisfies TemperLoreBook
