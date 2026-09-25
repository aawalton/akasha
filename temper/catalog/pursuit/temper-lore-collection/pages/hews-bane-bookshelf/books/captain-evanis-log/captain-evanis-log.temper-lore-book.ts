import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainEvanisLog = {
  id: "01a0d5f7-4293-7b1e-803b-7af019f952eb",
  type: "page-type/temper-lore-book",
  slug: "captain-evanis-log",
  title: "Captain Evani's Log",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3231,
  bookIndex: 42,
  charted: true,
  quest: 5532,
  positions: "jsonl",
} as const satisfies TemperLoreBook
