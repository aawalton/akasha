import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const redfurCorporalsLog = {
  id: "01a0d5f2-509f-787f-9fff-81dc368171d0",
  type: "page-type/temper-lore-book",
  slug: "redfur-corporals-log",
  title: "Redfur Corporal's Log",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2134,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
