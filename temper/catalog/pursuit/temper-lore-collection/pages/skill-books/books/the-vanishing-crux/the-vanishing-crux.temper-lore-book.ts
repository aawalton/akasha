import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theVanishingCrux = {
  id: "01a0d5f6-6d42-704d-a842-587db3439884",
  type: "page-type/temper-lore-book",
  slug: "the-vanishing-crux",
  title: "The Vanishing Crux",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2408,
  bookIndex: 61,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 4 },
    { mapId: 10, mapCount: 51 },
    { mapId: 13, mapCount: 5 },
    { mapId: 16, mapCount: 3 },
    { mapId: 26, mapCount: 31 },
    { mapId: 27, mapCount: 4 },
    { mapId: 61, mapCount: 1 },
    { mapId: 143, mapCount: 4 },
    { mapId: 255, mapCount: 22 },
    { mapId: 300, mapCount: 80 },
    { mapId: 660, mapCount: 4 },
    { mapId: 667, mapCount: 2 },
    { mapId: 1060, mapCount: 2 },
    { mapId: 1126, mapCount: 4 },
  ],
} as const satisfies TemperLoreBook
