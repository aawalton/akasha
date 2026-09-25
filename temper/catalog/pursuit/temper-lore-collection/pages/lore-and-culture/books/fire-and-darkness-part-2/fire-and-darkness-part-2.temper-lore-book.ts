import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fireAndDarknessPart2 = {
  id: "01a0d5f3-3fda-7991-8d02-c675dd37bf4e",
  type: "page-type/temper-lore-book",
  slug: "fire-and-darkness-part-2",
  title: "Fire and Darkness, Part 2",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1122,
  bookIndex: 40,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 10, mapCount: 16 },
    { mapId: 26, mapCount: 24 },
    { mapId: 27, mapCount: 1 },
    { mapId: 61, mapCount: 2 },
    { mapId: 300, mapCount: 26 },
    { mapId: 1006, mapCount: 20 },
    { mapId: 1060, mapCount: 31 },
    { mapId: 1349, mapCount: 29 },
    { mapId: 1429, mapCount: 8 },
  ],
} as const satisfies TemperLoreBook
