import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const templesOfTheDragonCult = {
  id: "01a0d5f5-f3e4-7093-8902-539a5bf5c74f",
  type: "page-type/temper-lore-book",
  slug: "temples-of-the-dragon-cult",
  title: "Temples of the Dragon Cult",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1491,
  bookIndex: 35,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1349, mapCount: 5 },
    { mapId: 1429, mapCount: 3 },
  ],
} as const satisfies TemperLoreBook
