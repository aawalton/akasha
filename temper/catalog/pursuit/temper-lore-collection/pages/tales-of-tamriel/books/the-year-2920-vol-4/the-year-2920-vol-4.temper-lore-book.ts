import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theYear2920Vol4 = {
  id: "01a0d5f5-7768-7fcc-a392-5f57a8285e12",
  type: "page-type/temper-lore-book",
  slug: "the-year-2920-vol-4",
  title: "The Year 2920, Vol. 4",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 2350,
  bookIndex: 98,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 25 },
    { mapId: 12, mapCount: 12 },
    { mapId: 13, mapCount: 15 },
    { mapId: 27, mapCount: 6 },
  ],
} as const satisfies TemperLoreBook
