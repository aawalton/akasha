import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mysticismTheUnfathomableVoyage = {
  id: "01a0d5f5-444b-777a-be26-4fa490659b4c",
  type: "page-type/temper-lore-book",
  slug: "mysticism-the-unfathomable-voyage",
  title: "Mysticism—The Unfathomable Voyage",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 801,
  bookIndex: 21,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 11 },
    { mapId: 7, mapCount: 14 },
    { mapId: 74, mapCount: 3 },
    { mapId: 75, mapCount: 6 },
    { mapId: 143, mapCount: 24 },
    { mapId: 227, mapCount: 10 },
    { mapId: 258, mapCount: 14 },
  ],
} as const satisfies TemperLoreBook
