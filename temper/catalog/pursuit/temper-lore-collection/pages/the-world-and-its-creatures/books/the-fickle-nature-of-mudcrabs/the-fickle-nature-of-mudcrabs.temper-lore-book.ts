import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFickleNatureOfMudcrabs = {
  id: "01a0d5f5-f3e5-7567-a219-17bc9198a713",
  type: "page-type/temper-lore-book",
  slug: "the-fickle-nature-of-mudcrabs",
  title: "The Fickle Nature of Mudcrabs",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1476,
  bookIndex: 29,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 18 },
    { mapId: 7, mapCount: 6 },
    { mapId: 74, mapCount: 1 },
    { mapId: 75, mapCount: 9 },
    { mapId: 143, mapCount: 41 },
    { mapId: 201, mapCount: 12 },
    { mapId: 227, mapCount: 3 },
    { mapId: 258, mapCount: 18 },
  ],
} as const satisfies TemperLoreBook
