import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBattleOfRedMountainPart2 = {
  id: "01a0d5f3-3fdb-7e96-b719-f20c8a03a4aa",
  type: "page-type/temper-lore-book",
  slug: "the-battle-of-red-mountain-part-2",
  title: "The Battle of Red Mountain, Part 2",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 819,
  bookIndex: 21,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 31 },
    { mapId: 12, mapCount: 21 },
    { mapId: 13, mapCount: 28 },
    { mapId: 27, mapCount: 4 },
  ],
} as const satisfies TemperLoreBook
