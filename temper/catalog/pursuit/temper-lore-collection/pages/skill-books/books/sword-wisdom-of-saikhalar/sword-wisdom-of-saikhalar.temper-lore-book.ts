import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const swordWisdomOfSaikhalar = {
  id: "01a0d5f6-6d42-7102-baf6-499182441936",
  type: "page-type/temper-lore-book",
  slug: "sword-wisdom-of-saikhalar",
  title: "Sword-Wisdom of Saikhalar",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2179,
  bookIndex: 5,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 15 },
    { mapId: 10, mapCount: 48 },
    { mapId: 13, mapCount: 6 },
    { mapId: 16, mapCount: 3 },
    { mapId: 26, mapCount: 48 },
    { mapId: 27, mapCount: 13 },
    { mapId: 61, mapCount: 1 },
    { mapId: 143, mapCount: 24 },
    { mapId: 255, mapCount: 26 },
    { mapId: 300, mapCount: 74 },
    { mapId: 660, mapCount: 2 },
    { mapId: 1060, mapCount: 11 },
    { mapId: 1126, mapCount: 61 },
  ],
} as const satisfies TemperLoreBook
