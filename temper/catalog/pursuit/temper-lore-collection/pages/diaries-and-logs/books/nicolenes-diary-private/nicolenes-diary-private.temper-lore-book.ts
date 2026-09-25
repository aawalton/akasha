import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nicolenesDiaryPrivate = {
  id: "01a0d5f2-509f-7304-b489-4d33a7a79c98",
  type: "page-type/temper-lore-book",
  slug: "nicolenes-diary-private",
  title: "Nicolene's Diary (Private!)",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1089,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
