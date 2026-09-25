import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLargesseOfTheArchmagister = {
  id: "01a0d60d-9a64-7b8a-b966-965ec01b03f9",
  type: "page-type/temper-lore-book",
  slug: "the-largesse-of-the-archmagister",
  title: "The Largesse of the Archmagister",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8206,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
