import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ladyMurciensFolly = {
  id: "01a0d5f6-1c16-7d66-8ead-d8fa18c70b26",
  type: "page-type/temper-lore-book",
  slug: "lady-murciens-folly",
  title: "Lady Murcien's Folly",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1879,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
