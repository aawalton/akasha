import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLavaQueen = {
  id: "01a0d5f3-3fdb-745e-9001-1f477173e8a4",
  type: "page-type/temper-lore-book",
  slug: "the-lava-queen",
  title: "The Lava Queen",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1116,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
