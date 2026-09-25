import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const returnToOrsinium = {
  id: "01a0d5e4-4cb1-7ddc-98c9-e6a62d5ff28a",
  type: "page-type/temper-lore-book",
  slug: "return-to-orsinium",
  title: "Return to Orsinium",
  collection: "temper-lore-collection/tamriel-history",
  bookIndex: 9,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
