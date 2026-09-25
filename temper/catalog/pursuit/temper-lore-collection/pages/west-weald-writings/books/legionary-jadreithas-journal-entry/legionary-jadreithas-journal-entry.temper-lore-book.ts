import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legionaryJadreithasJournalEntry = {
  id: "01a0d60d-4aaf-7fdd-83d6-1b9e31f48b4b",
  type: "page-type/temper-lore-book",
  slug: "legionary-jadreithas-journal-entry",
  title: "Legionary Jadreitha's Journal Entry",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8191,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
