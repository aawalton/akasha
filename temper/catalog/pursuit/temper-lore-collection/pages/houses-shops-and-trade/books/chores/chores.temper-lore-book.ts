import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chores = {
  id: "01a0d5f2-db25-7f72-813a-945fff68e7c1",
  type: "page-type/temper-lore-book",
  slug: "chores",
  title: "Chores",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 639,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
