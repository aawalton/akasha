import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToLozruth = {
  id: "01a0d5f7-160b-70a8-8bb0-2dc5358a2c23",
  type: "page-type/temper-lore-book",
  slug: "letter-to-lozruth",
  title: "Letter to Lozruth",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3217,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
