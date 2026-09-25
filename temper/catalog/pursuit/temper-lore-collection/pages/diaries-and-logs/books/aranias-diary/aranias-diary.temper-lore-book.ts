import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const araniasDiary = {
  id: "01a0d5f2-509e-71ce-acf0-d6c762be9567",
  type: "page-type/temper-lore-book",
  slug: "aranias-diary",
  title: "Aranias' Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 959,
  bookIndex: 21,
  charted: true,
  quest: 4411,
  positions: "jsonl",
} as const satisfies TemperLoreBook
