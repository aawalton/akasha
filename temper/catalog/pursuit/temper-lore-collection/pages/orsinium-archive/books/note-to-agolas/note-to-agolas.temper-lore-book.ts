import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToAgolas = {
  id: "01a0d5f7-160b-771c-9984-9877a7d66c9e",
  type: "page-type/temper-lore-book",
  slug: "note-to-agolas",
  title: "Note to Agolas",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3158,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
