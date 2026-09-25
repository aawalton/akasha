import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const orchelorsDiary = {
  id: "01a0d5f2-509f-70b1-8463-426089df771b",
  type: "page-type/temper-lore-book",
  slug: "orchelors-diary",
  title: "Orchelor's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1236,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
