import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const childrenOfTheSky = {
  id: "01a0d5f5-f3e3-7a96-8bcc-842632a89655",
  type: "page-type/temper-lore-book",
  slug: "children-of-the-sky",
  title: "Children of the Sky",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1141,
  bookIndex: 23,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 16 },
    { mapId: 27, mapCount: 1 },
    { mapId: 30, mapCount: 13 },
    { mapId: 61, mapCount: 25 },
  ],
} as const satisfies TemperLoreBook
