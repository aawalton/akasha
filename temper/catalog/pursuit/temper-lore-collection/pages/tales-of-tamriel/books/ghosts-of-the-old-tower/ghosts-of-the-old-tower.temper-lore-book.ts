import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ghostsOfTheOldTower = {
  id: "01a0d5f5-7766-70b5-9a19-ab1ed11db271",
  type: "page-type/temper-lore-book",
  slug: "ghosts-of-the-old-tower",
  title: "Ghosts of the Old Tower",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1888,
  bookIndex: 85,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 17 },
    { mapId: 10, mapCount: 11 },
    { mapId: 13, mapCount: 5 },
    { mapId: 16, mapCount: 13 },
    { mapId: 26, mapCount: 7 },
    { mapId: 27, mapCount: 8 },
    { mapId: 143, mapCount: 31 },
    { mapId: 255, mapCount: 28 },
    { mapId: 660, mapCount: 34 },
    { mapId: 667, mapCount: 2 },
    { mapId: 1060, mapCount: 13 },
    { mapId: 1126, mapCount: 3 },
  ],
} as const satisfies TemperLoreBook
