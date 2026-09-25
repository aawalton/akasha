import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const narsisDrensSkyrimJournal = {
  id: "01a0d60b-8108-7835-af3a-6dfb19a64d31",
  type: "page-type/temper-lore-book",
  slug: "narsis-drens-skyrim-journal",
  title: "Narsis Dren's Skyrim Journal",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5989,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
