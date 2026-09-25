import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToKingJorunn = {
  id: "01a0d5f4-3c12-7b27-8642-5981624cc901",
  type: "page-type/temper-lore-book",
  slug: "note-to-king-jorunn",
  title: "Note to King Jorunn",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 441,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
