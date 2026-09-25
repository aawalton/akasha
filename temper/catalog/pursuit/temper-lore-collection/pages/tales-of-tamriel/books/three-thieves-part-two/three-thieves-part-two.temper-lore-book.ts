import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const threeThievesPartTwo = {
  id: "01a0d5f5-7768-7eb7-bd25-d68351046b62",
  type: "page-type/temper-lore-book",
  slug: "three-thieves-part-two",
  title: "Three Thieves, Part Two",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1136,
  bookIndex: 50,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 29 },
    { mapId: 27, mapCount: 4 },
    { mapId: 30, mapCount: 18 },
    { mapId: 61, mapCount: 26 },
  ],
} as const satisfies TemperLoreBook
