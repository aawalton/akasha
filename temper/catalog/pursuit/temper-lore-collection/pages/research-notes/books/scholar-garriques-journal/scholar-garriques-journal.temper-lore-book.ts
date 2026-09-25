import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scholarGarriquesJournal = {
  id: "01a0d5f5-1385-7306-b01d-3bdac8c7c3f5",
  type: "page-type/temper-lore-book",
  slug: "scholar-garriques-journal",
  title: "Scholar Garrique's Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1265,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
