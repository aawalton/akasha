import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const callToTheCloisters = {
  id: "01a0d60d-156d-7c99-8e46-605d692555f2",
  type: "page-type/temper-lore-book",
  slug: "call-to-the-cloisters",
  title: "Call to the Cloisters",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7616,
  bookIndex: 25,
  charted: true,
  quest: 6997,
  positions: "jsonl",
} as const satisfies TemperLoreBook
