import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const arborealArchitecture = {
  id: "01a0d5f5-f3e3-78fa-85bc-6f4a0cf1151c",
  type: "page-type/temper-lore-book",
  slug: "arboreal-architecture",
  title: "Arboreal Architecture",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1490,
  bookIndex: 34,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 13 },
    { mapId: 27, mapCount: 1 },
    { mapId: 30, mapCount: 9 },
    { mapId: 61, mapCount: 3 },
  ],
} as const satisfies TemperLoreBook
