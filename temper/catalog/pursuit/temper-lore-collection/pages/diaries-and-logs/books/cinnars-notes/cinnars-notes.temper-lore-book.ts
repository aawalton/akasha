import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cinnarsNotes = {
  id: "01a0d5f2-509e-7d15-a213-4f792a728ab1",
  type: "page-type/temper-lore-book",
  slug: "cinnars-notes",
  title: "Cinnar's Notes",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1738,
  bookIndex: 46,
  charted: true,
  quest: 4791,
  positions: "jsonl",
} as const satisfies TemperLoreBook
