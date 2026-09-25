import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const velothThePilgrim = {
  id: "01a0d5f3-3fdc-7269-a1c5-19cc59a3ea59",
  type: "page-type/temper-lore-book",
  slug: "veloth-the-pilgrim",
  title: "Veloth the Pilgrim",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1481,
  bookIndex: 59,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 11 },
    { mapId: 12, mapCount: 6 },
    { mapId: 13, mapCount: 6 },
    { mapId: 27, mapCount: 6 },
  ],
} as const satisfies TemperLoreBook
