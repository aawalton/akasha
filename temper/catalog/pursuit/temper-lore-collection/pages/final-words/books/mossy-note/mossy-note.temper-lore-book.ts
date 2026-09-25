import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mossyNote = {
  id: "01a0d5f6-45ae-7a9b-9cf4-08e2a0391ce7",
  type: "page-type/temper-lore-book",
  slug: "mossy-note",
  title: "Mossy Note",
  collection: "temper-lore-collection/final-words",
  esoBookId: 2941,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
