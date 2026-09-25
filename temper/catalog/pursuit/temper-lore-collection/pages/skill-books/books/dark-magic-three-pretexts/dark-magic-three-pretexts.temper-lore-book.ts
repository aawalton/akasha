import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const darkMagicThreePretexts = {
  id: "01a0d5f6-6d40-72ee-9436-db02c40d1818",
  type: "page-type/temper-lore-book",
  slug: "dark-magic-three-pretexts",
  title: "Dark Magic: Three Pretexts",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2382,
  bookIndex: 47,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 44 },
    { mapId: 27, mapCount: 4 },
    { mapId: 30, mapCount: 15 },
    { mapId: 61, mapCount: 45 },
    { mapId: 1126, mapCount: 34 },
  ],
} as const satisfies TemperLoreBook
