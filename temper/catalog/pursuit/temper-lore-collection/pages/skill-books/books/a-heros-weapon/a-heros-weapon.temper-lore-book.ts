import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aHerosWeapon = {
  id: "01a0d5f6-6d3f-7a91-ae3a-b8f50742623e",
  type: "page-type/temper-lore-book",
  slug: "a-heros-weapon",
  title: "A Hero's Weapon",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2226,
  bookIndex: 10,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 9 },
    { mapId: 9, mapCount: 51 },
    { mapId: 10, mapCount: 6 },
    { mapId: 12, mapCount: 23 },
    { mapId: 13, mapCount: 73 },
    { mapId: 16, mapCount: 3 },
    { mapId: 26, mapCount: 6 },
    { mapId: 27, mapCount: 14 },
    { mapId: 143, mapCount: 5 },
    { mapId: 255, mapCount: 25 },
    { mapId: 660, mapCount: 2 },
    { mapId: 667, mapCount: 1 },
    { mapId: 1060, mapCount: 4 },
    { mapId: 1126, mapCount: 16 },
  ],
} as const satisfies TemperLoreBook
