import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFalconersLog = {
  id: "01a0d5f6-45ae-750e-9c8e-81b8edbaf461",
  type: "page-type/temper-lore-book",
  slug: "the-falconers-log",
  title: "The Falconer's Log",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1559,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
