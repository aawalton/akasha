import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToNurese = {
  id: "01a0d5f2-af70-7d9b-9290-b8a5615265c6",
  type: "page-type/temper-lore-book",
  slug: "note-to-nurese",
  title: "Note to Nurese",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1377,
  bookIndex: 43,
  charted: true,
  quest: 4468,
  positions: "jsonl",
} as const satisfies TemperLoreBook
