import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLivingGods = {
  id: "01a0d5e4-9c9a-7bb8-bd00-5e221b63a3c2",
  type: "page-type/temper-lore-book",
  slug: "the-living-gods",
  title: "The Living Gods",
  collection: "temper-lore-collection/deshaan-lore",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
