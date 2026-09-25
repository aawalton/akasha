import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const listOfNames = {
  id: "01a0d5f4-07b8-79a7-9f0e-434db2d71d86",
  type: "page-type/temper-lore-book",
  slug: "list-of-names",
  title: "List of Names",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 960,
  bookIndex: 19,
  charted: true,
  quest: 4411,
  positions: "jsonl",
} as const satisfies TemperLoreBook
