import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const frayedNote = {
  id: "01a0d5f6-f385-7682-ae27-1992abb154b8",
  type: "page-type/temper-lore-book",
  slug: "frayed-note",
  title: "Frayed Note",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 2902,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
