import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const jomundsResearchNotes = {
  id: "01a0d5f5-1384-7870-a5c7-2a8a53aea9c8",
  type: "page-type/temper-lore-book",
  slug: "jomunds-research-notes",
  title: "Jomund's Research Notes",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1281,
  bookIndex: 51,
  charted: true,
  quest: 4128,
  positions: "jsonl",
} as const satisfies TemperLoreBook
