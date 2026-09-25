import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anEasyAssignment = {
  id: "01a0d5f2-db25-72b0-a0a3-bb10c7ca0c69",
  type: "page-type/temper-lore-book",
  slug: "an-easy-assignment",
  title: "An Easy Assignment",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 679,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
