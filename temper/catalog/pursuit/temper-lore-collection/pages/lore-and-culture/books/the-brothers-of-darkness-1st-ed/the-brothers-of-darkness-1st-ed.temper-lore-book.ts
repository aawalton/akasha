import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBrothersOfDarkness1stEd = {
  id: "01a0d5f3-3fdb-7187-980d-bcdf46c2cc5d",
  type: "page-type/temper-lore-book",
  slug: "the-brothers-of-darkness-1st-ed",
  title: "The Brothers of Darkness (1st ed.)",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1139,
  bookIndex: 45,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 21 },
    { mapId: 27, mapCount: 2 },
    { mapId: 30, mapCount: 9 },
    { mapId: 61, mapCount: 14 },
  ],
} as const satisfies TemperLoreBook
