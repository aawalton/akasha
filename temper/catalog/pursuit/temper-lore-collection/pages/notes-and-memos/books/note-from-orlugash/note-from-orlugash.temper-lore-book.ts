import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromOrlugash = {
  id: "01a0d5f4-3c12-7d3e-add2-3f55a33c54e8",
  type: "page-type/temper-lore-book",
  slug: "note-from-orlugash",
  title: "Note from Orlugash",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 519,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
