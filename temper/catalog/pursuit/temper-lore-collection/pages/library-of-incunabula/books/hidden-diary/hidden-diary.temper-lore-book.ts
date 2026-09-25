import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hiddenDiary = {
  id: "01a0d5f8-02f8-711c-b32c-bcae7fde1096",
  type: "page-type/temper-lore-book",
  slug: "hidden-diary",
  title: "Hidden Diary",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6268,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
