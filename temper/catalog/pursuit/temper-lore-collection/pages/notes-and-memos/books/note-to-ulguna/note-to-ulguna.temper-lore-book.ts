import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToUlguna = {
  id: "01a0d5f4-3c12-7ae0-bbf2-fd9fa41cf688",
  type: "page-type/temper-lore-book",
  slug: "note-to-ulguna",
  title: "Note to Ulguna",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2026,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
