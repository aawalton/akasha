import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theArgonianMaidAnOralTradition = {
  id: "01a0d5f5-7767-72e6-8bfc-8103266cba57",
  type: "page-type/temper-lore-book",
  slug: "the-argonian-maid-an-oral-tradition",
  title: "The Argonian Maid—An Oral Tradition",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1104,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
