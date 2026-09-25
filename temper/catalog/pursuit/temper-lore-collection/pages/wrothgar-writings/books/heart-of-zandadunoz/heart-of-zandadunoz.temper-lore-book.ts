import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const heartOfZandadunoz = {
  id: "01a0d5f6-d68a-71da-9ebf-781712b8347b",
  type: "page-type/temper-lore-book",
  slug: "heart-of-zandadunoz",
  title: "Heart of Zandadunoz",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3118,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
