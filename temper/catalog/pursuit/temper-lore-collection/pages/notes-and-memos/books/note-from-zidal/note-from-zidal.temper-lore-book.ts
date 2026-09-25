import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromZidal = {
  id: "01a0d5f4-3c12-75d1-bc2c-662c25a6f0b2",
  type: "page-type/temper-lore-book",
  slug: "note-from-zidal",
  title: "Note from Zidal",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1320,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
