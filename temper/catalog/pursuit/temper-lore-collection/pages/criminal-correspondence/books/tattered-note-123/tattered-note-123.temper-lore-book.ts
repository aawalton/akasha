import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tatteredNote123 = {
  id: "01a0d5f1-f452-73c5-98f9-203c98c80c4d",
  type: "page-type/temper-lore-book",
  slug: "tattered-note-123",
  title: "Tattered Note",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 123,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
