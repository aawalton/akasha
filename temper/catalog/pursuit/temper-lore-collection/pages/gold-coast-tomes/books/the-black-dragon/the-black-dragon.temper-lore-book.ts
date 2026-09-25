import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBlackDragon = {
  id: "01a0d5f7-73fa-7541-9f75-c1bc17505979",
  type: "page-type/temper-lore-book",
  slug: "the-black-dragon",
  title: "The Black Dragon",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3281,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
