import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const alchemyReport = {
  id: "01a0d5f4-c382-7c88-b155-9f0484936fa4",
  type: "page-type/temper-lore-book",
  slug: "alchemy-report",
  title: "Alchemy Report",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 432,
  bookIndex: 5,
  charted: true,
  quest: 4150,
  positions: "jsonl",
} as const satisfies TemperLoreBook
