import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thingsToDo = {
  id: "01a0d5f2-db27-7a00-b0a1-b31b83919341",
  type: "page-type/temper-lore-book",
  slug: "things-to-do",
  title: "Things to Do",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 636,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
