import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFirstCharter = {
  id: "01a0d5f6-d68c-759e-ad48-74e6d26f709d",
  type: "page-type/temper-lore-book",
  slug: "the-first-charter",
  title: "The First Charter",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3110,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
