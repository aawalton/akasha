import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mikgetsToDoList = {
  id: "01a0d60c-40c0-79fa-b24e-6a30289b7e35",
  type: "page-type/temper-lore-book",
  slug: "mikgets-to-do-list",
  title: "Mikget's To-Do List",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6840,
  bookIndex: 25,
  charted: true,
  quest: 6728,
  positions: "jsonl",
} as const satisfies TemperLoreBook
