import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTimeIsPast = {
  id: "01a0d5f4-07b9-797b-a8c0-43b619857200",
  type: "page-type/temper-lore-book",
  slug: "the-time-is-past",
  title: "The Time Is Past",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1173,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
