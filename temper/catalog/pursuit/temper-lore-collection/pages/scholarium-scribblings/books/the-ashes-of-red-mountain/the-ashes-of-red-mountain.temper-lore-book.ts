import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAshesOfRedMountain = {
  id: "01a0d60d-9a64-787f-8531-a0da2dd9c65a",
  type: "page-type/temper-lore-book",
  slug: "the-ashes-of-red-mountain",
  title: "The Ashes of Red Mountain",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8157,
  bookIndex: 9,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
} as const satisfies TemperLoreBook
