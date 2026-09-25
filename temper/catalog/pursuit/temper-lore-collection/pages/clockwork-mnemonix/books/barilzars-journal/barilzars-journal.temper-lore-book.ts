import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const barilzarsJournal = {
  id: "01a0d60a-a213-71e6-8d70-6657fe645763",
  type: "page-type/temper-lore-book",
  slug: "barilzars-journal",
  title: "Barilzar's Journal",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4700,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
