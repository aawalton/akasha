import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const daedraDossierColdFlameAtronach = {
  id: "01a0d5f5-f3e3-7b9c-a2b7-8d47cc46ddd8",
  type: "page-type/temper-lore-book",
  slug: "daedra-dossier-cold-flame-atronach",
  title: "Daedra Dossier: Cold-Flame Atronach",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1894,
  bookIndex: 51,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 16 },
    { mapId: 10, mapCount: 4 },
    { mapId: 13, mapCount: 22 },
    { mapId: 16, mapCount: 3 },
    { mapId: 26, mapCount: 7 },
    { mapId: 27, mapCount: 4 },
    { mapId: 125, mapCount: 1 },
    { mapId: 143, mapCount: 10 },
    { mapId: 255, mapCount: 19 },
    { mapId: 660, mapCount: 2 },
    { mapId: 667, mapCount: 1 },
    { mapId: 1060, mapCount: 8 },
    { mapId: 1126, mapCount: 2 },
  ],
} as const satisfies TemperLoreBook
