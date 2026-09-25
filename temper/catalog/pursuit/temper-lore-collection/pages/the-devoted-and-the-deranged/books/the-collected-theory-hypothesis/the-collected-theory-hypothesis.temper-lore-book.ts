import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCollectedTheoryHypothesis = {
  id: "01a0d5f5-abba-7d60-b0f8-91fa0a5bba2b",
  type: "page-type/temper-lore-book",
  slug: "the-collected-theory-hypothesis",
  title: "The Collected Theory Hypothesis",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2096,
  bookIndex: 68,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 1 },
    { mapId: 7, mapCount: 16 },
    { mapId: 10, mapCount: 3 },
    { mapId: 13, mapCount: 5 },
    { mapId: 16, mapCount: 1 },
    { mapId: 26, mapCount: 3 },
    { mapId: 27, mapCount: 1 },
    { mapId: 143, mapCount: 1 },
    { mapId: 255, mapCount: 54 },
    { mapId: 660, mapCount: 2 },
    { mapId: 1060, mapCount: 3 },
    { mapId: 1126, mapCount: 8 },
  ],
} as const satisfies TemperLoreBook
