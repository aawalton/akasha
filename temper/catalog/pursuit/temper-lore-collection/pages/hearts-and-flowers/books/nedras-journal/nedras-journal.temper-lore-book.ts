import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nedrasJournal = {
  id: "01a0d5f2-af70-76df-9a16-027b83f6d176",
  type: "page-type/temper-lore-book",
  slug: "nedras-journal",
  title: "Nedras' Journal",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 2000,
  bookIndex: 57,
  charted: true,
  quest: 4955,
  positions: "jsonl",
} as const satisfies TemperLoreBook
