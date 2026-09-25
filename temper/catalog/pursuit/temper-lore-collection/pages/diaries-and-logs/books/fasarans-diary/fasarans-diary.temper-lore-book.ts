import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fasaransDiary = {
  id: "01a0d5f2-509e-74d6-b5cd-8ff58cf611f3",
  type: "page-type/temper-lore-book",
  slug: "fasarans-diary",
  title: "Fasaran's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 926,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
