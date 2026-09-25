import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSongOfGods = {
  id: "01a0d60b-8109-7163-a09a-54c691fb9bca",
  type: "page-type/temper-lore-book",
  slug: "the-song-of-gods",
  title: "The Song of Gods",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6101,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
