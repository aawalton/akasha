import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLibraryOfDuskRareBooks = {
  id: "01a0d5e5-15ef-7e9e-a13f-a5eb5602a205",
  type: "page-type/temper-lore-book",
  slug: "the-library-of-dusk-rare-books",
  title: "The Library of Dusk: Rare Books",
  collection: "temper-lore-collection/coldharbour-lore",
  bookIndex: 8,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
