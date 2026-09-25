import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fourCoinsOfYore = {
  id: "01a0d5f6-1c15-7ffb-aa20-d50a94e3c795",
  type: "page-type/temper-lore-book",
  slug: "four-coins-of-yore",
  title: "Four Coins of Yore",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 2263,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
