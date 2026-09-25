import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ostarandsDiary = {
  id: "01a0d5f2-509f-7fe9-9ada-4b70505fc1af",
  type: "page-type/temper-lore-book",
  slug: "ostarands-diary",
  title: "Ostarand's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1068,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
