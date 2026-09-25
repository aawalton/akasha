import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theYear2920Vol8 = {
  id: "01a0d5f5-7768-7c62-89e1-781c08cb91ff",
  type: "page-type/temper-lore-book",
  slug: "the-year-2920-vol-8",
  title: "The Year 2920, Vol. 8",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 2351,
  bookIndex: 99,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 10, mapCount: 23 },
    { mapId: 26, mapCount: 10 },
    { mapId: 27, mapCount: 2 },
    { mapId: 300, mapCount: 18 },
  ],
} as const satisfies TemperLoreBook
