import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shezarrAndTheDivines = {
  id: "01a0d5f5-abba-7ad6-b7e9-60e45b4eb237",
  type: "page-type/temper-lore-book",
  slug: "shezarr-and-the-divines",
  title: "Shezarr and the Divines",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2946,
  bookIndex: 75,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 660, mapCount: 5 },
    { mapId: 1006, mapCount: 18 },
    { mapId: 1060, mapCount: 21 },
    { mapId: 1349, mapCount: 1 },
    { mapId: 1429, mapCount: 2 },
  ],
} as const satisfies TemperLoreBook
