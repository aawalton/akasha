import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromSlimJah = {
  id: "01a0d5f4-3c12-74ad-bec4-0764db06545a",
  type: "page-type/temper-lore-book",
  slug: "note-from-slim-jah",
  title: "Note from Slim-Jah",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2101,
  bookIndex: 96,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
