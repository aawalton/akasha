import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gathielsDiary = {
  id: "01a0d5f2-509e-7c64-9292-ad24524e359f",
  type: "page-type/temper-lore-book",
  slug: "gathiels-diary",
  title: "Gathiel's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1778,
  bookIndex: 49,
  charted: true,
  quest: 4815,
  positions: "jsonl",
} as const satisfies TemperLoreBook
