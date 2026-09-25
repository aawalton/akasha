import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const feyneVildansDiary = {
  id: "01a0d5f2-af6f-7da8-a11f-e6d1739df3a4",
  type: "page-type/temper-lore-book",
  slug: "feyne-vildans-diary",
  title: "Feyne Vildan's Diary",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 728,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
