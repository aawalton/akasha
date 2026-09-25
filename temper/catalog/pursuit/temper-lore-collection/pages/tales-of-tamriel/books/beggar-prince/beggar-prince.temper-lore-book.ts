import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const beggarPrince = {
  id: "01a0d5f5-7766-7209-b290-0fdca230d8a5",
  type: "page-type/temper-lore-book",
  slug: "beggar-prince",
  title: "Beggar Prince",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1138,
  bookIndex: 51,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 17 },
    { mapId: 27, mapCount: 2 },
    { mapId: 30, mapCount: 17 },
    { mapId: 61, mapCount: 8 },
  ],
} as const satisfies TemperLoreBook
