import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const claudiesJournal = {
  id: "01a0d5f2-af6f-7cf0-a6ae-1163dcaf8996",
  type: "page-type/temper-lore-book",
  slug: "claudies-journal",
  title: "Claudie's Journal",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 760,
  bookIndex: 21,
  charted: true,
  quest: 3414,
  positions: "jsonl",
} as const satisfies TemperLoreBook
