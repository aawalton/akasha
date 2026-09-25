import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theThiefsLuck = {
  id: "01a0d5f4-07b9-72e5-99ba-2c49f6a9f30a",
  type: "page-type/temper-lore-book",
  slug: "the-thiefs-luck",
  title: "The Thief's Luck",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 463,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
