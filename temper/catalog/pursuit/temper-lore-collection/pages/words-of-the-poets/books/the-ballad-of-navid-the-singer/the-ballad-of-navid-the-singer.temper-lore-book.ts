import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBalladOfNavidTheSinger = {
  id: "01a0d5f6-1c16-7998-9cae-612001e4e620",
  type: "page-type/temper-lore-book",
  slug: "the-ballad-of-navid-the-singer",
  title: "The Ballad of Navid the Singer",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1527,
  bookIndex: 51,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 10, mapCount: 5 },
    { mapId: 26, mapCount: 5 },
    { mapId: 27, mapCount: 1 },
    { mapId: 61, mapCount: 7 },
    { mapId: 300, mapCount: 17 },
    { mapId: 439, mapCount: 3 },
    { mapId: 994, mapCount: 11 },
    { mapId: 1006, mapCount: 10 },
    { mapId: 1060, mapCount: 23 },
    { mapId: 1349, mapCount: 15 },
    { mapId: 1429, mapCount: 4 },
  ],
} as const satisfies TemperLoreBook
