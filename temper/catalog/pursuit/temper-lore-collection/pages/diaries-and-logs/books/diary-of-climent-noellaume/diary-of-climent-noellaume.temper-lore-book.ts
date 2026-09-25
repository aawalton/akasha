import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const diaryOfClimentNoellaume = {
  id: "01a0d5f2-509e-7df9-a906-64ab8891ecdd",
  type: "page-type/temper-lore-book",
  slug: "diary-of-climent-noellaume",
  title: "Diary of Climent Noellaume",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2094,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
