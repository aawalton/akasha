import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bravilPart2 = {
  id: "01a0d5f5-f3e3-7d63-9fcc-c9a774329ba0",
  type: "page-type/temper-lore-book",
  slug: "bravil-part-2",
  title: "Bravil, Part 2",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 811,
  bookIndex: 16,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 18 },
    { mapId: 12, mapCount: 12 },
    { mapId: 13, mapCount: 19 },
    { mapId: 20, mapCount: 1 },
    { mapId: 27, mapCount: 4 },
  ],
} as const satisfies TemperLoreBook
