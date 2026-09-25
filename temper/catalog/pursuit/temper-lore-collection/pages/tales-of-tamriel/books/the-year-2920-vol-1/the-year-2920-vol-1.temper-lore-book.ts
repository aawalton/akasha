import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theYear2920Vol1 = {
  id: "01a0d5f5-7768-7d22-9a14-2b6e9d4b3ff3",
  type: "page-type/temper-lore-book",
  slug: "the-year-2920-vol-1",
  title: "The Year 2920, Vol. 1",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 2348,
  bookIndex: 96,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 9 },
    { mapId: 7, mapCount: 7 },
    { mapId: 74, mapCount: 8 },
    { mapId: 75, mapCount: 1 },
    { mapId: 143, mapCount: 33 },
    { mapId: 201, mapCount: 6 },
    { mapId: 258, mapCount: 2 },
  ],
} as const satisfies TemperLoreBook
