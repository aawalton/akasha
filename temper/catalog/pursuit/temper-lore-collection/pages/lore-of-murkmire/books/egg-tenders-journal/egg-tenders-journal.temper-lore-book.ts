import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const eggTendersJournal = {
  id: "01a0d5f6-a299-7555-a211-edc1996c7fba",
  type: "page-type/temper-lore-book",
  slug: "egg-tenders-journal",
  title: "Egg-Tender's Journal",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5198,
  bookIndex: 65,
  charted: true,
  quest: 6258,
  positions: "jsonl",
  createdAt: "2026-09-25T00:28:25.625Z",
  updatedAt: "2026-09-25T00:28:28.000Z",
} as const satisfies TemperLoreBook
