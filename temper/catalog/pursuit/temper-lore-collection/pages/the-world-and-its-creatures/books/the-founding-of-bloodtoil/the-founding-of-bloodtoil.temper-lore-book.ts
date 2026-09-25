import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFoundingOfBloodtoil = {
  id: "01a0d5f5-f3e5-73ac-83a8-492ca33e5097",
  type: "page-type/temper-lore-book",
  slug: "the-founding-of-bloodtoil",
  title: "The Founding of Bloodtoil",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 397,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
