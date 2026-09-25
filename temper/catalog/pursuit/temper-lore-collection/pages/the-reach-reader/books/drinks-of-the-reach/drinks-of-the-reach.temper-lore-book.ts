import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const drinksOfTheReach = {
  id: "01a0d60b-c957-7bbc-a251-151018a56b57",
  type: "page-type/temper-lore-book",
  slug: "drinks-of-the-reach",
  title: "Drinks of the Reach",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 5907,
  bookIndex: 29,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 41, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
