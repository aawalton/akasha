import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const argonianRefugeesDiary = {
  id: "01a0d5f2-509e-7612-9dea-484d71be039f",
  type: "page-type/temper-lore-book",
  slug: "argonian-refugees-diary",
  title: "Argonian Refugee's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2102,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
