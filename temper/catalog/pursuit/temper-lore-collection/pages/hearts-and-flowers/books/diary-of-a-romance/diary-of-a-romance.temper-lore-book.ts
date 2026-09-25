import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const diaryOfARomance = {
  id: "01a0d5f2-af6f-79d2-8878-7bb2d8a755e9",
  type: "page-type/temper-lore-book",
  slug: "diary-of-a-romance",
  title: "Diary of a Romance",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1929,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
