import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const academySupplies = {
  id: "01a0d5f2-db25-72ce-a644-64159d8ff301",
  type: "page-type/temper-lore-book",
  slug: "academy-supplies",
  title: "Academy Supplies",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 651,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
