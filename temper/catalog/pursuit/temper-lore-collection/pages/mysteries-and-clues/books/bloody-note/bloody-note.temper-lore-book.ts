import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bloodyNote = {
  id: "01a0d5f4-07b7-7fcc-b5db-b8e74eea6862",
  type: "page-type/temper-lore-book",
  slug: "bloody-note",
  title: "Bloody Note",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 4027,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
