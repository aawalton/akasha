import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nerevarMoonAndStar = {
  id: "01a0d5f5-444c-757f-8ffb-0feeaf51ea96",
  type: "page-type/temper-lore-book",
  slug: "nerevar-moon-and-star",
  title: "Nerevar Moon-and-Star",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 802,
  bookIndex: 22,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 7 },
    { mapId: 7, mapCount: 14 },
    { mapId: 13, mapCount: 2 },
    { mapId: 74, mapCount: 3 },
    { mapId: 75, mapCount: 2 },
    { mapId: 143, mapCount: 14 },
    { mapId: 227, mapCount: 11 },
    { mapId: 258, mapCount: 27 },
  ],
} as const satisfies TemperLoreBook
