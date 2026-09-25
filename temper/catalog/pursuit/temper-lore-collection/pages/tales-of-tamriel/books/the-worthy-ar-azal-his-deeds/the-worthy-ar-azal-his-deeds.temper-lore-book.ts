import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWorthyArAzalHisDeeds = {
  id: "01a0d5f5-7768-7feb-b1c4-7d9cbd091413",
  type: "page-type/temper-lore-book",
  slug: "the-worthy-ar-azal-his-deeds",
  title: "The Worthy Ar-Azal, His Deeds",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 809,
  bookIndex: 34,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 24 },
    { mapId: 7, mapCount: 8 },
    { mapId: 74, mapCount: 6 },
    { mapId: 75, mapCount: 2 },
    { mapId: 143, mapCount: 26 },
    { mapId: 201, mapCount: 5 },
    { mapId: 227, mapCount: 1 },
  ],
} as const satisfies TemperLoreBook
