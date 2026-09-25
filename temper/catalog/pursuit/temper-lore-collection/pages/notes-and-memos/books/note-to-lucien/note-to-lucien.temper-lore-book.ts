import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToLucien = {
  id: "01a0d5f4-3c12-7f9f-9798-c20782620b0d",
  type: "page-type/temper-lore-book",
  slug: "note-to-lucien",
  title: "Note to Lucien",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 77,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
