import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fatherOfTheNibenFragmentTwo = {
  id: "01a0d5f5-f3e3-7ebe-a31c-71a43b80c99f",
  type: "page-type/temper-lore-book",
  slug: "father-of-the-niben-fragment-two",
  title: "Father of the Niben, Fragment Two",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 812,
  bookIndex: 17,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 18 },
    { mapId: 12, mapCount: 20 },
    { mapId: 13, mapCount: 12 },
    { mapId: 27, mapCount: 16 },
  ],
} as const satisfies TemperLoreBook
