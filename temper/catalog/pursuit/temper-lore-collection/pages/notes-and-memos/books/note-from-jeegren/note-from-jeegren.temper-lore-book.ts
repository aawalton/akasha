import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromJeegren = {
  id: "01a0d5f4-3c12-7f32-9c6a-63ca52851f5b",
  type: "page-type/temper-lore-book",
  slug: "note-from-jeegren",
  title: "Note from Jeegren",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 126,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
