import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const maxtensResearchJournal = {
  id: "01a0d60b-8108-785d-b9e9-45fa365b022d",
  type: "page-type/temper-lore-book",
  slug: "maxtens-research-journal",
  title: "Maxten's Research Journal",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5762,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
