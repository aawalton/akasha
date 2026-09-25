import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chancesFollyPart2 = {
  id: "01a0d5f5-7766-7f31-9f31-dd9892be5be6",
  type: "page-type/temper-lore-book",
  slug: "chances-folly-part-2",
  title: "Chance's Folly, Part 2",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1239,
  bookIndex: 61,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 19 },
    { mapId: 27, mapCount: 1 },
    { mapId: 30, mapCount: 4 },
    { mapId: 61, mapCount: 13 },
  ],
} as const satisfies TemperLoreBook
