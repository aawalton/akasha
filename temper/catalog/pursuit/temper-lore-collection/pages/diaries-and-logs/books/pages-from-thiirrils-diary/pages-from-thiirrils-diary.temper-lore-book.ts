import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pagesFromThiirrilsDiary = {
  id: "01a0d5f2-509f-7289-9dab-dd68bf1633a2",
  type: "page-type/temper-lore-book",
  slug: "pages-from-thiirrils-diary",
  title: "Pages from Thiirril's Diary",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2188,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
