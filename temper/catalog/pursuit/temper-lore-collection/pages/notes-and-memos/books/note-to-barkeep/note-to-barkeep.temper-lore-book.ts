import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToBarkeep = {
  id: "01a0d5f4-3c12-7129-aad3-f2a107334c40",
  type: "page-type/temper-lore-book",
  slug: "note-to-barkeep",
  title: "Note to Barkeep",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1878,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
