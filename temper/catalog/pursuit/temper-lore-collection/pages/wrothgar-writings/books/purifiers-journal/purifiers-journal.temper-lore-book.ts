import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const purifiersJournal = {
  id: "01a0d5f6-d68b-71a5-b6b6-18a6b6fe9f9b",
  type: "page-type/temper-lore-book",
  slug: "purifiers-journal",
  title: "Purifier's Journal",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2706,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
