import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sorceryIsNotNecromancy = {
  id: "01a0d5f6-6d41-7508-9114-03d8e6e4b106",
  type: "page-type/temper-lore-book",
  slug: "sorcery-is-not-necromancy",
  title: "Sorcery is Not Necromancy!",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2387,
  bookIndex: 49,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 51 },
    { mapId: 7, mapCount: 45 },
    { mapId: 13, mapCount: 2 },
    { mapId: 74, mapCount: 52 },
    { mapId: 75, mapCount: 1 },
    { mapId: 143, mapCount: 124 },
    { mapId: 201, mapCount: 9 },
    { mapId: 227, mapCount: 1 },
    { mapId: 258, mapCount: 18 },
    { mapId: 1126, mapCount: 7 },
  ],
} as const satisfies TemperLoreBook
