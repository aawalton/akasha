import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bewareTheShadowscales = {
  id: "01a0d5f3-7052-738c-8509-4c8f9ff3ff1e",
  type: "page-type/temper-lore-book",
  slug: "beware-the-shadowscales",
  title: "Beware the Shadowscales",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1496,
  bookIndex: 57,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 20, mapCount: 11 },
    { mapId: 27, mapCount: 4 },
    { mapId: 125, mapCount: 20 },
    { mapId: 256, mapCount: 15 },
  ],
} as const satisfies TemperLoreBook
