import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chroniclesOfTheFiveCompanions2 = {
  id: "01a0d5f5-c96e-7ba0-be9c-881093f1e648",
  type: "page-type/temper-lore-book",
  slug: "chronicles-of-the-five-companions-2",
  title: "Chronicles of the Five Companions 2",
  collection: "temper-lore-collection/the-five-companions",
  esoBookId: 1946,
  bookIndex: 10,
  charted: true,
  quest: 4552,
  positions: "jsonl",
} as const satisfies TemperLoreBook
