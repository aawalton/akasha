import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHangingGardens = {
  id: "01a0d5f5-f3e5-7450-9906-c2f4531ad097",
  type: "page-type/temper-lore-book",
  slug: "the-hanging-gardens",
  title: "The Hanging Gardens",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 799,
  bookIndex: 15,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 44 },
    { mapId: 7, mapCount: 26 },
    { mapId: 13, mapCount: 4 },
    { mapId: 74, mapCount: 8 },
    { mapId: 143, mapCount: 83 },
    { mapId: 201, mapCount: 5 },
    { mapId: 227, mapCount: 19 },
    { mapId: 258, mapCount: 19 },
  ],
} as const satisfies TemperLoreBook
