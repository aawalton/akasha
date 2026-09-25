import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thiefOfVirtue = {
  id: "01a0d5f5-7768-7804-a1c3-d7b83797eca1",
  type: "page-type/temper-lore-book",
  slug: "thief-of-virtue",
  title: "Thief of Virtue",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1146,
  bookIndex: 55,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 9 },
    { mapId: 27, mapCount: 1 },
    { mapId: 30, mapCount: 10 },
    { mapId: 61, mapCount: 9 },
  ],
} as const satisfies TemperLoreBook
