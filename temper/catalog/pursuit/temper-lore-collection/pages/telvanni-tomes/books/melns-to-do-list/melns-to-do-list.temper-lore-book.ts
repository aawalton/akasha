import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const melnsToDoList = {
  id: "01a0d60c-eb9b-7d6c-8847-7eadf8d98b37",
  type: "page-type/temper-lore-book",
  slug: "melns-to-do-list",
  title: "Meln's To-Do List",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7613,
  bookIndex: 10,
  charted: true,
  quest: 6973,
  positions: "jsonl",
} as const satisfies TemperLoreBook
