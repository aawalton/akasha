import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tonightHeConfessed = {
  id: "01a0d5f2-af71-7959-8df3-a1ebf502353a",
  type: "page-type/temper-lore-book",
  slug: "tonight-he-confessed",
  title: "Tonight He Confessed",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1975,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
