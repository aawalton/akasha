import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mzulftResearchersJournal = {
  id: "01a0d5f5-1385-7e9a-a184-7083bce6cf65",
  type: "page-type/temper-lore-book",
  slug: "mzulft-researchers-journal",
  title: "Mzulft Researcher's Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 381,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
