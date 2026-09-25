import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sacredWitnessPart2 = {
  id: "01a0d5f5-7767-7b05-a43b-c909c0cc6512",
  type: "page-type/temper-lore-book",
  slug: "sacred-witness-part-2",
  title: "Sacred Witness, Part 2",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1127,
  bookIndex: 46,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 10, mapCount: 7 },
    { mapId: 26, mapCount: 21 },
    { mapId: 27, mapCount: 1 },
    { mapId: 300, mapCount: 15 },
    { mapId: 1006, mapCount: 5 },
    { mapId: 1060, mapCount: 29 },
    { mapId: 1349, mapCount: 17 },
    { mapId: 1429, mapCount: 7 },
  ],
} as const satisfies TemperLoreBook
