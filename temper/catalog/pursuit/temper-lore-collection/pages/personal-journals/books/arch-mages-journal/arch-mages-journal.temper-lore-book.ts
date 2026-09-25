import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const archMagesJournal = {
  id: "01a0d5f4-6f19-75c9-a404-879fec8661d7",
  type: "page-type/temper-lore-book",
  slug: "arch-mages-journal",
  title: "Arch-Mage's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 650,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
