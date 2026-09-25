import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const steppingThroughShadows = {
  id: "01a0d5f6-6d42-7676-8955-0dc7cc101f76",
  type: "page-type/temper-lore-book",
  slug: "stepping-through-shadows",
  title: "Stepping through Shadows",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2366,
  bookIndex: 40,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 5 },
    { mapId: 10, mapCount: 38 },
    { mapId: 13, mapCount: 11 },
    { mapId: 16, mapCount: 1 },
    { mapId: 26, mapCount: 31 },
    { mapId: 27, mapCount: 3 },
    { mapId: 30, mapCount: 2 },
    { mapId: 61, mapCount: 1 },
    { mapId: 143, mapCount: 9 },
    { mapId: 255, mapCount: 31 },
    { mapId: 300, mapCount: 42 },
    { mapId: 660, mapCount: 1 },
    { mapId: 1060, mapCount: 5 },
    { mapId: 1126, mapCount: 9 },
  ],
} as const satisfies TemperLoreBook
