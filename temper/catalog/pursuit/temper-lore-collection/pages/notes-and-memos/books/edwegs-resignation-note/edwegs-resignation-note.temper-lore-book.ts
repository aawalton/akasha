import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const edwegsResignationNote = {
  id: "01a0d5f4-3c11-7b05-a049-9bf1df2b46a5",
  type: "page-type/temper-lore-book",
  slug: "edwegs-resignation-note",
  title: "Edweg's Resignation Note",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1982,
  bookIndex: 75,
  charted: true,
  quest: 4923,
  positions: "jsonl",
} as const satisfies TemperLoreBook
