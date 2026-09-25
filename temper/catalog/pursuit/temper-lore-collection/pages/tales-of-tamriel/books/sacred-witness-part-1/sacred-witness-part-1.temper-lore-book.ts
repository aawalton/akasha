import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sacredWitnessPart1 = {
  id: "01a0d5f5-7767-710d-aae7-68dc85e3d90d",
  type: "page-type/temper-lore-book",
  slug: "sacred-witness-part-1",
  title: "Sacred Witness, Part 1",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1126,
  bookIndex: 45,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 10, mapCount: 10 },
    { mapId: 26, mapCount: 6 },
    { mapId: 27, mapCount: 1 },
    { mapId: 61, mapCount: 5 },
    { mapId: 300, mapCount: 12 },
    { mapId: 1006, mapCount: 4 },
    { mapId: 1060, mapCount: 15 },
    { mapId: 1349, mapCount: 12 },
    { mapId: 1429, mapCount: 4 },
  ],
} as const satisfies TemperLoreBook
