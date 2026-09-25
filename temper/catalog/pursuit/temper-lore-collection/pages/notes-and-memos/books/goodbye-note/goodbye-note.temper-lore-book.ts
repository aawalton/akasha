import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const goodbyeNote = {
  id: "01a0d5f4-3c11-7b26-9a3e-0e4c8cf620e7",
  type: "page-type/temper-lore-book",
  slug: "goodbye-note",
  title: "Goodbye Note",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2326,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
