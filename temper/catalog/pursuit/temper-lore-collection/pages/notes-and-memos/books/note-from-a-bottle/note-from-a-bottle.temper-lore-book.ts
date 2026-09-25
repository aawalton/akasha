import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromABottle = {
  id: "01a0d5f4-3c12-7829-bd28-f1587ffdb3a6",
  type: "page-type/temper-lore-book",
  slug: "note-from-a-bottle",
  title: "Note from a Bottle",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1969,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
