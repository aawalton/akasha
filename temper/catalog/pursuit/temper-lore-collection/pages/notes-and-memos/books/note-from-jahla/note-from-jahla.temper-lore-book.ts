import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromJahla = {
  id: "01a0d5f4-3c12-7854-b11d-233d91cb8485",
  type: "page-type/temper-lore-book",
  slug: "note-from-jahla",
  title: "Note from Jahla",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1836,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
