import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wergitalTheWolfBoy = {
  id: "01a0d5f6-1c16-7f9e-af0d-97bcf284497b",
  type: "page-type/temper-lore-book",
  slug: "wergital-the-wolf-boy",
  title: "Wergital the Wolf-Boy",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1486,
  bookIndex: 45,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 10, mapCount: 13 },
    { mapId: 26, mapCount: 14 },
    { mapId: 27, mapCount: 3 },
    { mapId: 300, mapCount: 14 },
  ],
} as const satisfies TemperLoreBook
