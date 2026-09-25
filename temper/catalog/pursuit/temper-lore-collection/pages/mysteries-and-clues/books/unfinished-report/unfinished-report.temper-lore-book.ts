import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const unfinishedReport = {
  id: "01a0d5f4-07b9-7a01-b3de-c8052ebd3994",
  type: "page-type/temper-lore-book",
  slug: "unfinished-report",
  title: "Unfinished Report",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 4058,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
