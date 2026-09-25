import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rasabasNote = {
  id: "01a0d5f4-3c13-7f50-9856-7eaa872f1e6b",
  type: "page-type/temper-lore-book",
  slug: "rasabas-note",
  title: "Rasaba's Note",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1990,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
