import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const azarridsRace = {
  id: "01a0d5f6-6d3f-76ca-bbab-886fb1348566",
  type: "page-type/temper-lore-book",
  slug: "azarrids-race",
  title: "Azarrid's Race",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2257,
  bookIndex: 20,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 14 },
    { mapId: 10, mapCount: 30 },
    { mapId: 13, mapCount: 10 },
    { mapId: 16, mapCount: 3 },
    { mapId: 26, mapCount: 49 },
    { mapId: 27, mapCount: 6 },
    { mapId: 61, mapCount: 1 },
    { mapId: 143, mapCount: 5 },
    { mapId: 255, mapCount: 14 },
    { mapId: 300, mapCount: 55 },
    { mapId: 660, mapCount: 2 },
    { mapId: 667, mapCount: 1 },
    { mapId: 1060, mapCount: 4 },
    { mapId: 1126, mapCount: 46 },
  ],
} as const satisfies TemperLoreBook
