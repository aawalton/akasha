import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theOldWays = {
  id: "01a0d5e3-fde4-7132-b866-efc8251faaba",
  type: "page-type/temper-lore-book",
  slug: "the-old-ways",
  title: "The Old Ways",
  collection: "temper-lore-collection/magic-and-magicka",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
