import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ladyLaurentsToDoList = {
  id: "01a0d5f6-d68b-724d-864e-3756a34f9bc2",
  type: "page-type/temper-lore-book",
  slug: "lady-laurents-to-do-list",
  title: "Lady Laurent's To-Do List",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3108,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
