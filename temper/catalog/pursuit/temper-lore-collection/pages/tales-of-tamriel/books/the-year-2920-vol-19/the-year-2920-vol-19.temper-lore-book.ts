import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theYear2920Vol19 = {
  id: "01a0d5f5-7768-74cb-9717-1c9650bc4900",
  type: "page-type/temper-lore-book",
  slug: "the-year-2920-vol-19",
  title: "The Year 2920, Vol. 19",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 2356,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 20, mapCount: 11 },
    { mapId: 27, mapCount: 5 },
    { mapId: 125, mapCount: 18 },
    { mapId: 256, mapCount: 8 },
  ],
} as const satisfies TemperLoreBook
