import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fadedNote = {
  id: "01a0d5f6-45ad-75e8-abb9-943b8e1373c7",
  type: "page-type/temper-lore-book",
  slug: "faded-note",
  title: "Faded Note",
  collection: "temper-lore-collection/final-words",
  esoBookId: 592,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
