import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLostIslandsOfOldYokuda = {
  id: "01a0d5f5-f3e5-7520-b65d-287f413e750b",
  type: "page-type/temper-lore-book",
  slug: "the-lost-islands-of-old-yokuda",
  title: "The Lost Islands of Old Yokuda",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1773,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
