import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kingsHavenScoutingRecord = {
  id: "01a0d60a-d5bd-73f2-aa25-8f02233e31e4",
  type: "page-type/temper-lore-book",
  slug: "kings-haven-scouting-record",
  title: "King's Haven Scouting Record",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4980,
  bookIndex: 96,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
