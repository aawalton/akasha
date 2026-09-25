import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const varietiesOfFaithTheKhajiit = {
  id: "01a0d5e4-d87c-7f12-8e9f-5d1f5020844f",
  type: "page-type/temper-lore-book",
  slug: "varieties-of-faith-the-khajiit",
  title: "Varieties of Faith: The Khajiit",
  collection: "temper-lore-collection/grahtwood-lore",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
