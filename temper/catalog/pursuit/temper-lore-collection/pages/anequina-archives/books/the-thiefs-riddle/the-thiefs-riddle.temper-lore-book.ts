import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theThiefsRiddle = {
  id: "01a0d60b-2346-72b4-9ba9-8d0690e153d5",
  type: "page-type/temper-lore-book",
  slug: "the-thiefs-riddle",
  title: "The Thief's Riddle",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5458,
  bookIndex: 87,
  charted: true,
  quest: 6319,
  positions: "jsonl",
} as const satisfies TemperLoreBook
