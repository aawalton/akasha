import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bordauntVirelandesJournal = {
  id: "01a0d5f5-abb9-77b6-b451-0affbf32a715",
  type: "page-type/temper-lore-book",
  slug: "bordaunt-virelandes-journal",
  title: "Bordaunt Virelande's Journal",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1934,
  bookIndex: 61,
  charted: true,
  quest: 4895,
  positions: "jsonl",
} as const satisfies TemperLoreBook
