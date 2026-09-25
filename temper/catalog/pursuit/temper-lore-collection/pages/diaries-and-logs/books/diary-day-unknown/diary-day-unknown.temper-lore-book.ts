import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const diaryDayUnknown = {
  id: "01a0d5f2-509e-7e2d-bcd6-859db951fb13",
  type: "page-type/temper-lore-book",
  slug: "diary-day-unknown",
  title: "Diary, Day Unknown",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2030,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
