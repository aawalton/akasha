import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const backHomeInOrsinium = {
  id: "01a0d5f2-509e-7ebc-a0ea-336279b3c307",
  type: "page-type/temper-lore-book",
  slug: "back-home-in-orsinium",
  title: "Back Home in Orsinium",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1230,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
