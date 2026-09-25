import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shadowDrainingAHypothesis = {
  id: "01a0d5f6-6d41-7e94-982a-1ccbf25d9f30",
  type: "page-type/temper-lore-book",
  slug: "shadow-draining-a-hypothesis",
  title: "Shadow Draining: A Hypothesis",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2365,
  bookIndex: 39,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 10 },
    { mapId: 10, mapCount: 3 },
    { mapId: 13, mapCount: 2 },
    { mapId: 16, mapCount: 3 },
    { mapId: 22, mapCount: 51 },
    { mapId: 26, mapCount: 6 },
    { mapId: 27, mapCount: 2 },
    { mapId: 30, mapCount: 15 },
    { mapId: 61, mapCount: 28 },
    { mapId: 143, mapCount: 11 },
    { mapId: 255, mapCount: 23 },
    { mapId: 667, mapCount: 2 },
    { mapId: 1060, mapCount: 4 },
    { mapId: 1126, mapCount: 43 },
  ],
} as const satisfies TemperLoreBook
