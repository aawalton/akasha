import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fireAndDarknessPart1 = {
  id: "01a0d5f3-3fda-76ba-b8f7-8cbde65b1273",
  type: "page-type/temper-lore-book",
  slug: "fire-and-darkness-part-1",
  title: "Fire and Darkness, Part 1",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1119,
  bookIndex: 39,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 10, mapCount: 8 },
    { mapId: 26, mapCount: 17 },
    { mapId: 27, mapCount: 2 },
    { mapId: 300, mapCount: 10 },
    { mapId: 1006, mapCount: 5 },
    { mapId: 1060, mapCount: 22 },
    { mapId: 1349, mapCount: 29 },
    { mapId: 1429, mapCount: 7 },
  ],
  positions: "jsonl",
} as const satisfies TemperLoreBook
