import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const piercedNote = {
  id: "01a0d5f4-07b8-7d77-a58e-e5a4ac684eb1",
  type: "page-type/temper-lore-book",
  slug: "pierced-note",
  title: "Pierced Note",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 4106,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
