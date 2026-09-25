import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromGullveig = {
  id: "01a0d5f4-3c12-7833-9b16-5f831a695612",
  type: "page-type/temper-lore-book",
  slug: "note-from-gullveig",
  title: "Note from Gullveig",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 438,
  bookIndex: 7,
  charted: true,
  quest: 4160,
  positions: "jsonl",
} as const satisfies TemperLoreBook
