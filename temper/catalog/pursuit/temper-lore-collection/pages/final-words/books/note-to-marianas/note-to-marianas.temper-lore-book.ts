import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToMarianas = {
  id: "01a0d5f6-45ae-7138-b8fd-cb567fd753d0",
  type: "page-type/temper-lore-book",
  slug: "note-to-marianas",
  title: "Note to Marianas",
  collection: "temper-lore-collection/final-words",
  esoBookId: 2830,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
