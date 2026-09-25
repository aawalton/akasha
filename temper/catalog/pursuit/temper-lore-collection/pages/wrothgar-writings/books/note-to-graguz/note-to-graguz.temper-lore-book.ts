import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToGraguz = {
  id: "01a0d5f6-d68b-7a31-8d2d-ca4b22e5b7a2",
  type: "page-type/temper-lore-book",
  slug: "note-to-graguz",
  title: "Note to Graguz",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3142,
  bookIndex: 94,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
