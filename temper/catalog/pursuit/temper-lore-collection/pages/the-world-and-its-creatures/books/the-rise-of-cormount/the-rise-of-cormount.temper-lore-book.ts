import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRiseOfCormount = {
  id: "01a0d5f5-f3e5-729e-9ece-a8213fcc25d0",
  type: "page-type/temper-lore-book",
  slug: "the-rise-of-cormount",
  title: "The Rise of Cormount",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 2116,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
