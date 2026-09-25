import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheUtilityOfShockMagic = {
  id: "01a0d5f6-6d41-79dc-9777-e16fd72696fc",
  type: "page-type/temper-lore-book",
  slug: "on-the-utility-of-shock-magic",
  title: "On the Utility of Shock Magic",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2381,
  bookIndex: 46,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 9 },
    { mapId: 10, mapCount: 4 },
    { mapId: 13, mapCount: 3 },
    { mapId: 16, mapCount: 3 },
    { mapId: 20, mapCount: 38 },
    { mapId: 26, mapCount: 3 },
    { mapId: 27, mapCount: 18 },
    { mapId: 125, mapCount: 37 },
    { mapId: 143, mapCount: 25 },
    { mapId: 255, mapCount: 35 },
    { mapId: 256, mapCount: 29 },
    { mapId: 667, mapCount: 1 },
    { mapId: 1060, mapCount: 8 },
    { mapId: 1126, mapCount: 11 },
  ],
} as const satisfies TemperLoreBook
