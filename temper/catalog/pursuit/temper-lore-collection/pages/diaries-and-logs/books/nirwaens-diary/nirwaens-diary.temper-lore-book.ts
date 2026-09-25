import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nirwaensDiary = {
  id: "01a0d5f2-509f-7268-8ecb-e2d6748353ff",
  type: "page-type/temper-lore-book",
  slug: "nirwaens-diary",
  title: "Nirwaen's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 734,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
