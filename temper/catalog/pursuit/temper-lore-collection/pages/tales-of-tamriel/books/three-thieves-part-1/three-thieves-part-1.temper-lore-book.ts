import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const threeThievesPart1 = {
  id: "01a0d5f5-7768-71db-ae79-c1eee7b013a2",
  type: "page-type/temper-lore-book",
  slug: "three-thieves-part-1",
  title: "Three Thieves, Part 1",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1135,
  bookIndex: 49,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 21 },
    { mapId: 27, mapCount: 3 },
    { mapId: 30, mapCount: 20 },
    { mapId: 61, mapCount: 27 },
  ],
} as const satisfies TemperLoreBook
