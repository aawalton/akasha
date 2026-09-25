import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nordArmorersAndArmsmen = {
  id: "01a0d5f6-6d41-7137-b09d-eae7abfd536e",
  type: "page-type/temper-lore-book",
  slug: "nord-armorers-and-armsmen",
  title: "Nord Armorers and Armsmen",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 1488,
  bookIndex: 79,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 8 },
    { mapId: 10, mapCount: 13 },
    { mapId: 13, mapCount: 4 },
    { mapId: 22, mapCount: 40 },
    { mapId: 26, mapCount: 4 },
    { mapId: 27, mapCount: 4 },
    { mapId: 30, mapCount: 12 },
    { mapId: 61, mapCount: 20 },
    { mapId: 125, mapCount: 3 },
    { mapId: 143, mapCount: 4 },
    { mapId: 255, mapCount: 6 },
    { mapId: 667, mapCount: 2 },
    { mapId: 1060, mapCount: 10 },
    { mapId: 1126, mapCount: 15 },
  ],
} as const satisfies TemperLoreBook
