import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aWayOut = {
  id: "01a0d5f6-f384-7dd1-bdc2-627d631b5dcb",
  type: "page-type/temper-lore-book",
  slug: "a-way-out",
  title: "A Way Out",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 2832,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
