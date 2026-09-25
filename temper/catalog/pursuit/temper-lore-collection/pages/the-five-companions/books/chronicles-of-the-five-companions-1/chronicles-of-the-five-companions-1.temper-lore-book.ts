import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chroniclesOfTheFiveCompanions1 = {
  id: "01a0d5f5-c96e-7428-b1ca-2ed80e213e5a",
  type: "page-type/temper-lore-book",
  slug: "chronicles-of-the-five-companions-1",
  title: "Chronicles of the Five Companions 1",
  collection: "temper-lore-collection/the-five-companions",
  esoBookId: 1877,
  bookIndex: 9,
  charted: true,
  quest: 4474,
  positions: "jsonl",
} as const satisfies TemperLoreBook
