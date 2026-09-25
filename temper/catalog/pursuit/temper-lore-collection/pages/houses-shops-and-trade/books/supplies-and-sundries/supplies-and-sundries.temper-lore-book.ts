import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const suppliesAndSundries = {
  id: "01a0d5f2-db26-7003-8595-1901dfbd9597",
  type: "page-type/temper-lore-book",
  slug: "supplies-and-sundries",
  title: "Supplies and Sundries",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 340,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
