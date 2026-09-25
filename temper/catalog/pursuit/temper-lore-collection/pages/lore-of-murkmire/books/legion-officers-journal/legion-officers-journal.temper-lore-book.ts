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
} as const satisfies TemperLoreBook
