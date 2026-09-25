import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const moonWorshipAmongTheCatMen = {
  id: "01a0d5f5-abba-7e40-82f8-fa4351da7905",
  type: "page-type/temper-lore-book",
  slug: "moon-worship-among-the-cat-men",
  title: "Moon Worship among the Cat-Men",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1492,
  bookIndex: 42,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 20, mapCount: 3 },
    { mapId: 27, mapCount: 5 },
    { mapId: 30, mapCount: 5 },
    { mapId: 125, mapCount: 9 },
    { mapId: 256, mapCount: 8 },
  ],
} as const satisfies TemperLoreBook
