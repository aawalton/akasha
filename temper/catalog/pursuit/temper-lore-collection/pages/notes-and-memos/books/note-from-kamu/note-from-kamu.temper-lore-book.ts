import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromKamu = {
  id: "01a0d5f4-3c12-7223-bddf-9ae64f70eafd",
  type: "page-type/temper-lore-book",
  slug: "note-from-kamu",
  title: "Note from Kamu",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1886,
  bookIndex: 70,
  charted: true,
  quest: 4399,
  positions: "jsonl",
} as const satisfies TemperLoreBook
