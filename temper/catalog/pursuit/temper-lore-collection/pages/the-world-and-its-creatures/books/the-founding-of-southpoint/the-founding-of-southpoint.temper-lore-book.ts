import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFoundingOfSouthpoint = {
  id: "01a0d5f5-f3e5-77b2-9473-8c7e2da9e29c",
  type: "page-type/temper-lore-book",
  slug: "the-founding-of-southpoint",
  title: "The Founding of Southpoint",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 2107,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
