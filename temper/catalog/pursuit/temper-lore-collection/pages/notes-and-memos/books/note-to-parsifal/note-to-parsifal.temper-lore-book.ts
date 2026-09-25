import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToParsifal = {
  id: "01a0d5f4-3c12-7d67-ac7c-a36b0c2050ec",
  type: "page-type/temper-lore-book",
  slug: "note-to-parsifal",
  title: "Note to Parsifal",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2367,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
