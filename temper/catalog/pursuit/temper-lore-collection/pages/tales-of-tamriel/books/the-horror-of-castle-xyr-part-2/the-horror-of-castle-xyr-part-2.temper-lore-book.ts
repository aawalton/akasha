import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHorrorOfCastleXyrPart2 = {
  id: "01a0d5f5-7767-759d-a8ca-9d731630abfb",
  type: "page-type/temper-lore-book",
  slug: "the-horror-of-castle-xyr-part-2",
  title: "The Horror of Castle Xyr, Part 2",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1130,
  bookIndex: 48,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 10, mapCount: 3 },
    { mapId: 22, mapCount: 16 },
    { mapId: 26, mapCount: 11 },
    { mapId: 27, mapCount: 1 },
    { mapId: 30, mapCount: 17 },
    { mapId: 61, mapCount: 12 },
    { mapId: 300, mapCount: 10 },
  ],
} as const satisfies TemperLoreBook
