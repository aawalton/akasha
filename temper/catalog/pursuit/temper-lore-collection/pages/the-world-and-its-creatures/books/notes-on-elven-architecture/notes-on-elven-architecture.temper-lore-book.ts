import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOnElvenArchitecture = {
  id: "01a0d5f5-f3e4-74d5-9632-fa0bd8130e98",
  type: "page-type/temper-lore-book",
  slug: "notes-on-elven-architecture",
  title: "Notes on Elven Architecture",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1483,
  bookIndex: 31,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 18 },
    { mapId: 12, mapCount: 6 },
    { mapId: 13, mapCount: 9 },
    { mapId: 27, mapCount: 4 },
    { mapId: 61, mapCount: 2 },
    { mapId: 439, mapCount: 1 },
    { mapId: 994, mapCount: 20 },
    { mapId: 1006, mapCount: 4 },
    { mapId: 1060, mapCount: 26 },
    { mapId: 1349, mapCount: 88 },
    { mapId: 1429, mapCount: 24 },
  ],
} as const satisfies TemperLoreBook
