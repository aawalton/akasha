import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const moraatsTheoryOfLightning = {
  id: "01a0d5f6-6d41-7150-8157-98fbfc673730",
  type: "page-type/temper-lore-book",
  slug: "moraats-theory-of-lightning",
  title: "Mora'at's Theory of Lightning",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2388,
  bookIndex: 50,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 57 },
    { mapId: 12, mapCount: 41 },
    { mapId: 13, mapCount: 60 },
    { mapId: 20, mapCount: 1 },
    { mapId: 27, mapCount: 12 },
    { mapId: 1126, mapCount: 27 },
  ],
} as const satisfies TemperLoreBook
