import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ofTheDragonfiresFragment = {
  id: "01a0d5f3-3fdb-777e-a6ab-792b953a990c",
  type: "page-type/temper-lore-book",
  slug: "of-the-dragonfires-fragment",
  title: "Of the Dragonfires (Fragment)",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 795,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 32 },
    { mapId: 7, mapCount: 26 },
    { mapId: 13, mapCount: 1 },
    { mapId: 74, mapCount: 14 },
    { mapId: 75, mapCount: 5 },
    { mapId: 143, mapCount: 72 },
    { mapId: 201, mapCount: 5 },
    { mapId: 227, mapCount: 14 },
    { mapId: 258, mapCount: 32 },
  ],
} as const satisfies TemperLoreBook
