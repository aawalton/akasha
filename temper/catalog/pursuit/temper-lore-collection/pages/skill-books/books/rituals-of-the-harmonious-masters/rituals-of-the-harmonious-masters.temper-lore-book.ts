import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ritualsOfTheHarmoniousMasters = {
  id: "01a0d5f6-6d41-7fee-bb20-8c306c54c46d",
  type: "page-type/temper-lore-book",
  slug: "rituals-of-the-harmonious-masters",
  title: "Rituals of the Harmonious Masters",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2370,
  bookIndex: 43,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 11 },
    { mapId: 10, mapCount: 44 },
    { mapId: 13, mapCount: 4 },
    { mapId: 16, mapCount: 4 },
    { mapId: 26, mapCount: 38 },
    { mapId: 27, mapCount: 9 },
    { mapId: 61, mapCount: 1 },
    { mapId: 143, mapCount: 16 },
    { mapId: 255, mapCount: 23 },
    { mapId: 300, mapCount: 45 },
    { mapId: 660, mapCount: 9 },
    { mapId: 667, mapCount: 3 },
    { mapId: 1060, mapCount: 10 },
    { mapId: 1126, mapCount: 6 },
  ],
} as const satisfies TemperLoreBook
