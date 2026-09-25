import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const graveyardResearchNotes = {
  id: "01a0d5f5-1384-7075-be4e-ae8bab33692e",
  type: "page-type/temper-lore-book",
  slug: "graveyard-research-notes",
  title: "Graveyard Research Notes",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 2205,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
