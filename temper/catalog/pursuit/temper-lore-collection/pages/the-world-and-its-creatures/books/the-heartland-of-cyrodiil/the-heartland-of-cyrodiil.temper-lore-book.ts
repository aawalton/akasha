import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHeartlandOfCyrodiil = {
  id: "01a0d5f5-f3e5-7ab9-9d0c-902035db1dc7",
  type: "page-type/temper-lore-book",
  slug: "the-heartland-of-cyrodiil",
  title: "The Heartland of Cyrodiil",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 797,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
