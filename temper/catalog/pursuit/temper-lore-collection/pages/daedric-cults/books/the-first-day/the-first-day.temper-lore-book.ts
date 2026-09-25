import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFirstDay = {
  id: "01a0d5f2-253b-7f94-b588-01e528d65647",
  type: "page-type/temper-lore-book",
  slug: "the-first-day",
  title: "The First Day",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2756,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
