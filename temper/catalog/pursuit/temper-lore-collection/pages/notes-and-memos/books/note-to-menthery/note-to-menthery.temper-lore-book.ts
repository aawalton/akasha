import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToMenthery = {
  id: "01a0d5f4-3c12-7bd9-b8b4-7c5aebc3f576",
  type: "page-type/temper-lore-book",
  slug: "note-to-menthery",
  title: "Note to Menthery",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1646,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
