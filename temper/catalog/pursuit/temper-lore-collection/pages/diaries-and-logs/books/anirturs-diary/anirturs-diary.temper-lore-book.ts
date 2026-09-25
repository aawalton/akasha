import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anirtursDiary = {
  id: "01a0d5f2-509e-7401-963c-716bf51204db",
  type: "page-type/temper-lore-book",
  slug: "anirturs-diary",
  title: "Anirtur's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2071,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
