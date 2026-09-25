import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theScrollOfUsunok = {
  id: "01a0d5f6-d68c-75f8-a807-57f94b944938",
  type: "page-type/temper-lore-book",
  slug: "the-scroll-of-usunok",
  title: "The Scroll of Usunok",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3060,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
