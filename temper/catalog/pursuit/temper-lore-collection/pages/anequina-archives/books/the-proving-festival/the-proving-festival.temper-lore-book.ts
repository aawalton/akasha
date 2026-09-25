import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theProvingFestival = {
  id: "01a0d60b-2346-7656-ac29-dd29cf069639",
  type: "page-type/temper-lore-book",
  slug: "the-proving-festival",
  title: "The Proving Festival",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5463,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
