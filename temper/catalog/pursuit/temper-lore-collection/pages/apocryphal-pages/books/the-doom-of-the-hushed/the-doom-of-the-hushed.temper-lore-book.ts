import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDoomOfTheHushed = {
  id: "01a0d60d-156e-79d0-9aea-39a86de38328",
  type: "page-type/temper-lore-book",
  slug: "the-doom-of-the-hushed",
  title: "The Doom of the Hushed",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7423,
  bookIndex: 14,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2275, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
