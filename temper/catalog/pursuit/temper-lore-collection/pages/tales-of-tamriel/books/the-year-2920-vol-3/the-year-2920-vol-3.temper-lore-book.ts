import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theYear2920Vol3 = {
  id: "01a0d5f5-7768-7ce7-9613-5e65f0c46873",
  type: "page-type/temper-lore-book",
  slug: "the-year-2920-vol-3",
  title: "The Year 2920, Vol. 3",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 2349,
  bookIndex: 97,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 8 },
    { mapId: 7, mapCount: 9 },
    { mapId: 13, mapCount: 4 },
    { mapId: 74, mapCount: 19 },
    { mapId: 75, mapCount: 2 },
    { mapId: 143, mapCount: 16 },
    { mapId: 201, mapCount: 6 },
    { mapId: 227, mapCount: 2 },
  ],
} as const satisfies TemperLoreBook
