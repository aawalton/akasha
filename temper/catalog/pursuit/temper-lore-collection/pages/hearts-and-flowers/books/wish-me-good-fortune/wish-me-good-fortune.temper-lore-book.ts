import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wishMeGoodFortune = {
  id: "01a0d5f2-af71-7c12-945a-1a6c3a45d698",
  type: "page-type/temper-lore-book",
  slug: "wish-me-good-fortune",
  title: "Wish Me Good Fortune",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1169,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
