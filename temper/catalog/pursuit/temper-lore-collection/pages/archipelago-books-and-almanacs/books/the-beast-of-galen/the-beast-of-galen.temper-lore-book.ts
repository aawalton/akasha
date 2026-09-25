import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBeastOfGalen = {
  id: "01a0d60c-baf4-716b-8c3f-5430d3712338",
  type: "page-type/temper-lore-book",
  slug: "the-beast-of-galen",
  title: "The Beast of Galen",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7531,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
