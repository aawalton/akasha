import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromCommanderDerre = {
  id: "01a0d5f4-3c12-7807-9dc9-6b9a9f48c945",
  type: "page-type/temper-lore-book",
  slug: "note-from-commander-derre",
  title: "Note from Commander Derre",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 838,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
