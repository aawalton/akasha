import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromScoutJustal = {
  id: "01a0d5f4-3c12-711f-bc1a-3bd4fe70bc20",
  type: "page-type/temper-lore-book",
  slug: "note-from-scout-justal",
  title: "Note from Scout Justal",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 837,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
