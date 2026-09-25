import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromUxunath = {
  id: "01a0d60d-156e-70b7-be35-4013c7bedaca",
  type: "page-type/temper-lore-book",
  slug: "note-from-uxunath",
  title: "Note from Uxunath",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7775,
  bookIndex: 67,
  charted: true,
  quest: 6992,
  positions: "jsonl",
} as const satisfies TemperLoreBook
