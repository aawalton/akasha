import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anExcerptFromTheBookOfSeasons = {
  id: "01a0d5f7-4293-79a6-ab7a-770b8a6edd50",
  type: "page-type/temper-lore-book",
  slug: "an-excerpt-from-the-book-of-seasons",
  title: "An Excerpt from the Book of Seasons",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3413,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
