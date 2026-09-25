import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSultryArgonianBardVol1 = {
  id: "01a0d5f5-7767-778d-a3dc-59d3b3f871f6",
  type: "page-type/temper-lore-book",
  slug: "the-sultry-argonian-bard-vol-1",
  title: "The Sultry Argonian Bard, Vol. 1",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1147,
  bookIndex: 56,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 2 },
    { mapId: 22, mapCount: 20 },
    { mapId: 27, mapCount: 1 },
    { mapId: 30, mapCount: 4 },
    { mapId: 61, mapCount: 21 },
    { mapId: 439, mapCount: 1 },
    { mapId: 994, mapCount: 9 },
    { mapId: 1006, mapCount: 25 },
    { mapId: 1060, mapCount: 26 },
    { mapId: 1313, mapCount: 1 },
    { mapId: 1349, mapCount: 13 },
    { mapId: 1429, mapCount: 5 },
  ],
} as const satisfies TemperLoreBook
