import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const irrigationResearchJournal = {
  id: "01a0d5f5-1384-7575-940a-bd427cda9bae",
  type: "page-type/temper-lore-book",
  slug: "irrigation-research-journal",
  title: "Irrigation Research Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 2261,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
