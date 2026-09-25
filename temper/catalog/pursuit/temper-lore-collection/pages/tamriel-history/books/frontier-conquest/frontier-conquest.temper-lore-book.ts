import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const frontierConquest = {
  id: "01a0d5e4-4cb1-7bb2-a6e8-3b06c8051adc",
  type: "page-type/temper-lore-book",
  slug: "frontier-conquest",
  title: "Frontier, Conquest",
  collection: "temper-lore-collection/tamriel-history",
  bookIndex: 2,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
