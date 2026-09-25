import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBrothersOfStrife = {
  id: "01a0d5e4-6057-7325-85b8-2ed24572e7f6",
  type: "page-type/temper-lore-book",
  slug: "the-brothers-of-strife",
  title: "The Brothers of Strife",
  collection: "temper-lore-collection/stonefalls-lore",
  bookIndex: 2,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
