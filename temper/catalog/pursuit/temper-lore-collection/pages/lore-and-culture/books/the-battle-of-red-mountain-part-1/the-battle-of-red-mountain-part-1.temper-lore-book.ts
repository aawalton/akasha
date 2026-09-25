import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBattleOfRedMountainPart1 = {
  id: "01a0d5f3-3fdb-7de0-9e2a-319d027ca90d",
  type: "page-type/temper-lore-book",
  slug: "the-battle-of-red-mountain-part-1",
  title: "The Battle of Red Mountain, Part 1",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 818,
  bookIndex: 20,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 11 },
    { mapId: 12, mapCount: 33 },
    { mapId: 13, mapCount: 11 },
    { mapId: 27, mapCount: 6 },
  ],
} as const satisfies TemperLoreBook
