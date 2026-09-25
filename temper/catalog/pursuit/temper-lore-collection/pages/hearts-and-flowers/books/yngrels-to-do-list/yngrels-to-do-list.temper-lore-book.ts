import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yngrelsToDoList = {
  id: "01a0d5f2-af71-7c42-8435-ef59902ad67c",
  type: "page-type/temper-lore-book",
  slug: "yngrels-to-do-list",
  title: "Yngrel's To Do List",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 844,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
