import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromNoFingers = {
  id: "01a0d5f2-af70-72f4-ba0e-856fed8ffee8",
  type: "page-type/temper-lore-book",
  slug: "note-from-no-fingers",
  title: "Note from No-Fingers",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 2103,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
