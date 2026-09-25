import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forLetterFinder = {
  id: "01a0d5f7-160b-7d09-b110-e03560520b85",
  type: "page-type/temper-lore-book",
  slug: "for-letter-finder",
  title: "For Letter Finder",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 2774,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
