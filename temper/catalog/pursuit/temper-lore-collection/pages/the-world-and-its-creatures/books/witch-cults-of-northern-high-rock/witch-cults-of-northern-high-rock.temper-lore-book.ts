import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const witchCultsOfNorthernHighRock = {
  id: "01a0d5f5-f3e5-7ae1-851e-95ccfdfeb940",
  type: "page-type/temper-lore-book",
  slug: "witch-cults-of-northern-high-rock",
  title: "Witch Cults of Northern High Rock",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1477,
  bookIndex: 30,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 19 },
    { mapId: 7, mapCount: 19 },
    { mapId: 75, mapCount: 1 },
    { mapId: 143, mapCount: 38 },
    { mapId: 201, mapCount: 12 },
    { mapId: 227, mapCount: 1 },
    { mapId: 258, mapCount: 1 },
  ],
} as const satisfies TemperLoreBook
