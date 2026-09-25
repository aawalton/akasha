import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stormholdCityOfShadowfen = {
  id: "01a0d5f5-f3e4-786e-82c2-880cc39cee03",
  type: "page-type/temper-lore-book",
  slug: "stormhold-city-of-shadowfen",
  title: "Stormhold, City of Shadowfen",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1494,
  bookIndex: 36,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 20, mapCount: 50 },
    { mapId: 27, mapCount: 4 },
    { mapId: 125, mapCount: 5 },
    { mapId: 256, mapCount: 10 },
  ],
} as const satisfies TemperLoreBook
