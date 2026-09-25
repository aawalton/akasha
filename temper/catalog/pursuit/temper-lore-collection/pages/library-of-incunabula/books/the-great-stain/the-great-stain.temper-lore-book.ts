import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGreatStain = {
  id: "01a0d5f8-02f9-787c-b17f-17ac028991dc",
  type: "page-type/temper-lore-book",
  slug: "the-great-stain",
  title: "The Great Stain",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6718,
  bookIndex: 91,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
