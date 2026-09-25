import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nadinesDiary = {
  id: "01a0d5f2-509f-772d-ab70-e1d8cd21848e",
  type: "page-type/temper-lore-book",
  slug: "nadines-diary",
  title: "Nadine's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 753,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
