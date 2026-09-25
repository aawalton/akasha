import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBookOfReason = {
  id: "01a0d5f2-83a3-716f-bdb9-595f40675a67",
  type: "page-type/temper-lore-book",
  slug: "the-book-of-reason",
  title: "The Book of Reason",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1896,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
