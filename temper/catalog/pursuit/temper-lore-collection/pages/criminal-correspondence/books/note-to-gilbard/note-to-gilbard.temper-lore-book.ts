import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToGilbard = {
  id: "01a0d5f1-f451-7070-a779-920dc684fa95",
  type: "page-type/temper-lore-book",
  slug: "note-to-gilbard",
  title: "Note to Gilbard",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1344,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
