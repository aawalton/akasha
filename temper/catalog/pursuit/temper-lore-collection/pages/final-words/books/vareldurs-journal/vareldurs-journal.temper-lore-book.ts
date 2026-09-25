import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vareldursJournal = {
  id: "01a0d5f6-45ae-7d20-801c-63604f68a6f7",
  type: "page-type/temper-lore-book",
  slug: "vareldurs-journal",
  title: "Vareldur's Journal",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1189,
  bookIndex: 25,
  charted: true,
  quest: 4524,
  positions: "jsonl",
} as const satisfies TemperLoreBook
