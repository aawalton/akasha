import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBookOfTheGreatTree = {
  id: "01a0d5e4-d87c-7598-a8a3-67632243e655",
  type: "page-type/temper-lore-book",
  slug: "the-book-of-the-great-tree",
  title: "The Book of the Great Tree",
  collection: "temper-lore-collection/grahtwood-lore",
  bookIndex: 3,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
