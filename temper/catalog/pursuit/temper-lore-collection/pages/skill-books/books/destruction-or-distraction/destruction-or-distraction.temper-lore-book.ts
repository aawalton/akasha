import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const destructionOrDistraction = {
  id: "01a0d5f6-6d40-7c02-9378-7d6bc8cb4b6c",
  type: "page-type/temper-lore-book",
  slug: "destruction-or-distraction",
  title: "Destruction or Distraction",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2406,
  bookIndex: 59,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 6 },
    { mapId: 10, mapCount: 6 },
    { mapId: 13, mapCount: 5 },
    { mapId: 16, mapCount: 1 },
    { mapId: 20, mapCount: 27 },
    { mapId: 26, mapCount: 2 },
    { mapId: 27, mapCount: 27 },
    { mapId: 125, mapCount: 20 },
    { mapId: 143, mapCount: 10 },
    { mapId: 255, mapCount: 22 },
    { mapId: 256, mapCount: 31 },
    { mapId: 660, mapCount: 3 },
    { mapId: 1060, mapCount: 3 },
    { mapId: 1126, mapCount: 24 },
  ],
} as const satisfies TemperLoreBook
