import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromAkash = {
  id: "01a0d5f4-3c12-7390-aeaf-c7c5403aae42",
  type: "page-type/temper-lore-book",
  slug: "note-from-akash",
  title: "Note from Akash",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1784,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
