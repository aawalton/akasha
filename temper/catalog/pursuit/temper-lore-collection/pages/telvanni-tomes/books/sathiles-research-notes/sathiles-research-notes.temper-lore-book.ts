import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sathilesResearchNotes = {
  id: "01a0d60c-eb9c-70b9-a8db-76a99fb98a7f",
  type: "page-type/temper-lore-book",
  slug: "sathiles-research-notes",
  title: "Sathile's Research Notes",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7577,
  bookIndex: 47,
  charted: true,
  quest: 6999,
  positions: "jsonl",
} as const satisfies TemperLoreBook
