import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const warOfTwoHouses = {
  id: "01a0d5e4-9c9a-7290-84d0-4038e649d620",
  type: "page-type/temper-lore-book",
  slug: "war-of-two-houses",
  title: "War of Two Houses",
  collection: "temper-lore-collection/deshaan-lore",
  bookIndex: 7,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
