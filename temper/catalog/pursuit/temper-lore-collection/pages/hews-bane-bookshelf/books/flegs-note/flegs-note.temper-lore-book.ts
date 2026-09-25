import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const flegsNote = {
  id: "01a0d5f7-4293-79e2-a0b2-aa80ff04fff1",
  type: "page-type/temper-lore-book",
  slug: "flegs-note",
  title: "Fleg's Note",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3428,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
