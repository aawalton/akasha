import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chancesFollyPart1 = {
  id: "01a0d5f5-7766-7481-b44a-3ca4e0e85f88",
  type: "page-type/temper-lore-book",
  slug: "chances-folly-part-1",
  title: "Chance's Folly, Part 1",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1140,
  bookIndex: 52,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 30 },
    { mapId: 27, mapCount: 5 },
    { mapId: 30, mapCount: 15 },
    { mapId: 61, mapCount: 12 },
  ],
} as const satisfies TemperLoreBook
