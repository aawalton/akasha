import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTimeIsNow = {
  id: "01a0d5f4-07b9-7d10-9182-d0297c2ab88e",
  type: "page-type/temper-lore-book",
  slug: "the-time-is-now",
  title: "The Time Is Now",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1174,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
