import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sovngardeAReexamination = {
  id: "01a0d5f5-abba-7f68-89df-29aefa6a0a79",
  type: "page-type/temper-lore-book",
  slug: "sovngarde-a-reexamination",
  title: "Sovngarde, A Reexamination",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1162,
  bookIndex: 41,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 8 },
    { mapId: 10, mapCount: 12 },
    { mapId: 13, mapCount: 7 },
    { mapId: 16, mapCount: 9 },
    { mapId: 20, mapCount: 9 },
    { mapId: 26, mapCount: 7 },
    { mapId: 27, mapCount: 17 },
    { mapId: 125, mapCount: 8 },
    { mapId: 143, mapCount: 5 },
    { mapId: 255, mapCount: 32 },
    { mapId: 256, mapCount: 7 },
    { mapId: 667, mapCount: 1 },
    { mapId: 1060, mapCount: 15 },
    { mapId: 1126, mapCount: 18 },
  ],
} as const satisfies TemperLoreBook
