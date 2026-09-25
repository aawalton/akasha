import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const garnikhsHuntingLog = {
  id: "01a0d5f2-509e-7b86-813b-2102dffc4e0f",
  type: "page-type/temper-lore-book",
  slug: "garnikhs-hunting-log",
  title: "Garnikh's Hunting Log",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1355,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
