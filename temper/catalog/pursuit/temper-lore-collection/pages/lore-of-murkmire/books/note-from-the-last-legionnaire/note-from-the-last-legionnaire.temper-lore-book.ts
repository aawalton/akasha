import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromTheLastLegionnaire = {
  id: "01a0d5f6-a29a-70c8-8221-e720b0d27ce9",
  type: "page-type/temper-lore-book",
  slug: "note-from-the-last-legionnaire",
  title: "Note from the Last Legionnaire",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5150,
  bookIndex: 48,
  charted: true,
  quest: 6240,
  positions: "jsonl",
} as const satisfies TemperLoreBook
