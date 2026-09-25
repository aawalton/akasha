import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sayingsOfTheWise = {
  id: "01a0d5f3-3fdb-778b-85c0-1766abfe1299",
  type: "page-type/temper-lore-book",
  slug: "sayings-of-the-wise",
  title: "Sayings of the Wise",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1356,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
