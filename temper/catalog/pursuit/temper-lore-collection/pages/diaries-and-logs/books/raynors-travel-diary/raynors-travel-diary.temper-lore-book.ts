import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const raynorsTravelDiary = {
  id: "01a0d5f2-509f-72ec-9cca-d0a31cf81050",
  type: "page-type/temper-lore-book",
  slug: "raynors-travel-diary",
  title: "Raynor's Travel Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1340,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
