import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRiteOfBoethiahsGauntlet = {
  id: "01a0d5f6-1c16-7695-af4a-943f860b61a6",
  type: "page-type/temper-lore-book",
  slug: "the-rite-of-boethiahs-gauntlet",
  title: "The Rite of Boethiah's Gauntlet",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 813,
  bookIndex: 23,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 25 },
    { mapId: 12, mapCount: 11 },
    { mapId: 13, mapCount: 11 },
    { mapId: 27, mapCount: 2 },
    { mapId: 61, mapCount: 4 },
    { mapId: 439, mapCount: 1 },
    { mapId: 994, mapCount: 15 },
    { mapId: 1006, mapCount: 7 },
    { mapId: 1060, mapCount: 41 },
    { mapId: 1349, mapCount: 11 },
    { mapId: 1429, mapCount: 9 },
  ],
} as const satisfies TemperLoreBook
