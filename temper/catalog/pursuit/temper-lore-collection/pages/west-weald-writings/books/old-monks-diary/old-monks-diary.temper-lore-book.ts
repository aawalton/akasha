import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oldMonksDiary = {
  id: "01a0d60d-4ab0-77f4-ae0e-81f951c31be0",
  type: "page-type/temper-lore-book",
  slug: "old-monks-diary",
  title: "Old Monk's Diary",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8015,
  bookIndex: 43,
  charted: true,
  quest: 7084,
  positions: "jsonl",
} as const satisfies TemperLoreBook
