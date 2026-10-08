import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legionOfficersJournal = {
  id: "01a0d5f6-a299-7b50-b29c-952678ab7ff6",
  type: "page-type/temper-lore-book",
  slug: "legion-officers-journal",
  title: "Legion Officer's Journal",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5147,
  bookIndex: 47,
  charted: true,
  quest: 6240,
  positions: "jsonl",
  createdAt: "2026-09-25T00:28:25.625Z",
  updatedAt: "2026-09-25T00:28:28.000Z",
} as const satisfies TemperLoreBook
