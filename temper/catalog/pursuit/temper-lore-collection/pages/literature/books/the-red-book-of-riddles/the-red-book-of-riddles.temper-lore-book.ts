import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRedBookOfRiddles = {
  id: "01a0d5e3-e98c-7d53-b57f-f4faf9cb8660",
  type: "page-type/temper-lore-book",
  slug: "the-red-book-of-riddles",
  title: "The Red Book of Riddles",
  collection: "temper-lore-collection/literature",
  bookIndex: 7,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
