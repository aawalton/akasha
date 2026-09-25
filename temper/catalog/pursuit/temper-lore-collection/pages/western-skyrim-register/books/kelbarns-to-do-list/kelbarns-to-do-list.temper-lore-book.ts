import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kelbarnsToDoList = {
  id: "01a0d60b-a361-7642-a959-1a0b8fdc3923",
  type: "page-type/temper-lore-book",
  slug: "kelbarns-to-do-list",
  title: "Kelbarn's To-Do List",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6110,
  bookIndex: 23,
  charted: true,
  quest: 6533,
  positions: "jsonl",
} as const satisfies TemperLoreBook
