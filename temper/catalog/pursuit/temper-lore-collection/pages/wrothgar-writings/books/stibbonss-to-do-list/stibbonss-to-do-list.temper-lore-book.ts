import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stibbonssToDoList = {
  id: "01a0d5f6-d68b-7e2c-8ece-05cc3499a32a",
  type: "page-type/temper-lore-book",
  slug: "stibbonss-to-do-list",
  title: "Stibbons's To-Do List",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3107,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
