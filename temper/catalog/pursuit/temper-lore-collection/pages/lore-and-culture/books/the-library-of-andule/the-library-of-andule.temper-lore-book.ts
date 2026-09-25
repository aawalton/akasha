import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLibraryOfAndule = {
  id: "01a0d5f3-3fdb-76c7-92a2-68c56ead8e02",
  type: "page-type/temper-lore-book",
  slug: "the-library-of-andule",
  title: "The Library of Andule",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 4057,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
