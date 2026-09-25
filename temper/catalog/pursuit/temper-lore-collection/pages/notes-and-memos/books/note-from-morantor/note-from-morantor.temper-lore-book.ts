import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromMorantor = {
  id: "01a0d5f4-3c12-7442-a595-0831dd30426e",
  type: "page-type/temper-lore-book",
  slug: "note-from-morantor",
  title: "Note from Morantor",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1094,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
