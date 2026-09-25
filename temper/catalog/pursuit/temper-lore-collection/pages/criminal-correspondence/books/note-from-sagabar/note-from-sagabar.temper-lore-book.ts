import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromSagabar = {
  id: "01a0d5f1-f451-7c85-991c-0e02e66ced45",
  type: "page-type/temper-lore-book",
  slug: "note-from-sagabar",
  title: "Note from Sagabar",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 2136,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
