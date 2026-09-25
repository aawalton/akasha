import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const revoltingLifeCycleOfTheDreugh = {
  id: "01a0d5f5-f3e4-7c5b-843e-5953bea92cdf",
  type: "page-type/temper-lore-book",
  slug: "revolting-life-cycle-of-the-dreugh",
  title: "Revolting Life Cycle of the Dreugh",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1479,
  bookIndex: 60,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 6 },
    { mapId: 12, mapCount: 12 },
    { mapId: 13, mapCount: 10 },
    { mapId: 27, mapCount: 2 },
  ],
} as const satisfies TemperLoreBook
