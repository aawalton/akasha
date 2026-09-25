import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const immortalBloodPart1 = {
  id: "01a0d5f5-7766-758a-8f06-879d24bfb5ee",
  type: "page-type/temper-lore-book",
  slug: "immortal-blood-part-1",
  title: "Immortal Blood, Part 1",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1144,
  bookIndex: 54,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 21 },
    { mapId: 27, mapCount: 4 },
    { mapId: 30, mapCount: 18 },
    { mapId: 61, mapCount: 23 },
  ],
} as const satisfies TemperLoreBook
