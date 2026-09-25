import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const careOfKwama = {
  id: "01a0d5f5-f3e3-7ac7-b6f5-e917f5d6c820",
  type: "page-type/temper-lore-book",
  slug: "care-of-kwama",
  title: "Care of Kwama",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1561,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
