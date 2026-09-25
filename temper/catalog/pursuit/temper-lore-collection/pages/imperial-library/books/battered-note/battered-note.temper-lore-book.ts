import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const batteredNote = {
  id: "01a0d5f6-f384-7e42-b244-c486e7cbd7e1",
  type: "page-type/temper-lore-book",
  slug: "battered-note",
  title: "Battered Note",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 2904,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
