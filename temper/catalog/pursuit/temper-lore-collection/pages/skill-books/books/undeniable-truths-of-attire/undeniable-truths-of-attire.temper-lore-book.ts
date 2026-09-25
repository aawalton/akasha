import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const undeniableTruthsOfAttire = {
  id: "01a0d5f6-6d42-7af8-8e9e-0720e0cc467a",
  type: "page-type/temper-lore-book",
  slug: "undeniable-truths-of-attire",
  title: "Undeniable Truths of Attire",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2253,
  bookIndex: 16,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 1 },
    { mapId: 7, mapCount: 7 },
    { mapId: 9, mapCount: 2 },
    { mapId: 10, mapCount: 36 },
    { mapId: 13, mapCount: 2 },
    { mapId: 16, mapCount: 4 },
    { mapId: 26, mapCount: 47 },
    { mapId: 27, mapCount: 10 },
    { mapId: 61, mapCount: 1 },
    { mapId: 143, mapCount: 11 },
    { mapId: 255, mapCount: 27 },
    { mapId: 300, mapCount: 74 },
    { mapId: 1060, mapCount: 2 },
    { mapId: 1126, mapCount: 6 },
  ],
} as const satisfies TemperLoreBook
