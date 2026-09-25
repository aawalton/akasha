import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theYear2920Vol18 = {
  id: "01a0d5f5-7768-7503-bbc4-f56be231d8e3",
  type: "page-type/temper-lore-book",
  slug: "the-year-2920-vol-18",
  title: "The Year 2920, Vol. 18",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 2355,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 20, mapCount: 10 },
    { mapId: 27, mapCount: 3 },
    { mapId: 125, mapCount: 16 },
    { mapId: 256, mapCount: 7 },
  ],
} as const satisfies TemperLoreBook
