import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theKeepersOath = {
  id: "01a0d60a-d5be-7af8-b081-f7d57ee60110",
  type: "page-type/temper-lore-book",
  slug: "the-keepers-oath",
  title: "The Keeper's Oath",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4792,
  bookIndex: 69,
  charted: true,
  quest: 6118,
  positions: "jsonl",
} as const satisfies TemperLoreBook
