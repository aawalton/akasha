import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainTsuzosLog = {
  id: "01a0d60c-75b4-7cf7-95e1-4df6fef05cc0",
  type: "page-type/temper-lore-book",
  slug: "captain-tsuzos-log",
  title: "Captain Tsuzo's Log",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7264,
  bookIndex: 97,
  charted: true,
  quest: 6754,
  positions: "jsonl",
} as const satisfies TemperLoreBook
