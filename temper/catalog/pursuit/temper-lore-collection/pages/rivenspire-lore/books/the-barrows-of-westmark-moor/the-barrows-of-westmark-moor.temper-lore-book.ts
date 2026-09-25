import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBarrowsOfWestmarkMoor = {
  id: "01a0d5e3-04bc-7a06-94e1-871789b77772",
  type: "page-type/temper-lore-book",
  slug: "the-barrows-of-westmark-moor",
  title: "The Barrows of Westmark Moor",
  collection: "temper-lore-collection/rivenspire-lore",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
