import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromRazumDar = {
  id: "01a0d5f4-3c12-737b-82c7-4f93b9744473",
  type: "page-type/temper-lore-book",
  slug: "note-from-razum-dar",
  title: "Note from Razum-dar",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2539,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
