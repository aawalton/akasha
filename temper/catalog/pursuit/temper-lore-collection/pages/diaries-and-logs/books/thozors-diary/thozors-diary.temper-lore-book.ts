import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thozorsDiary = {
  id: "01a0d5f2-509f-7c8f-9934-18ee349e23fd",
  type: "page-type/temper-lore-book",
  slug: "thozors-diary",
  title: "Thozor's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2550,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
