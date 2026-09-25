import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mathiasRaimentsJournal = {
  id: "01a0d5f2-af70-798d-a4d8-b25e3c093151",
  type: "page-type/temper-lore-book",
  slug: "mathias-raiments-journal",
  title: "Mathias Raiment's Journal",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1248,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
