import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromTheomund = {
  id: "01a0d5f4-3c12-747e-a1a8-ada2ddc02027",
  type: "page-type/temper-lore-book",
  slug: "note-from-theomund",
  title: "Note from Theomund",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1899,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
