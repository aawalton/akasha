import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const avengeUs = {
  id: "01a0d5f6-45ad-73d3-b1db-0b46f4c13f85",
  type: "page-type/temper-lore-book",
  slug: "avenge-us",
  title: "Avenge Us!",
  collection: "temper-lore-collection/final-words",
  esoBookId: 2213,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
