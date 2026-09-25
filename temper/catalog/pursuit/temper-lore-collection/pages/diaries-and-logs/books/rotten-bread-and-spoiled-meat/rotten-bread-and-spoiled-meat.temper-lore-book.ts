import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rottenBreadAndSpoiledMeat = {
  id: "01a0d5f2-509f-789b-96c3-6e66d2a2543e",
  type: "page-type/temper-lore-book",
  slug: "rotten-bread-and-spoiled-meat",
  title: "Rotten Bread and Spoiled Meat",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1638,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
