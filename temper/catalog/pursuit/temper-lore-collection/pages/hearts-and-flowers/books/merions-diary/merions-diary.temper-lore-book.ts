import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const merionsDiary = {
  id: "01a0d5f2-af70-7811-81aa-ea517863e2db",
  type: "page-type/temper-lore-book",
  slug: "merions-diary",
  title: "Merion's Diary",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 585,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
