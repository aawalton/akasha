import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pleaForOpenEyes = {
  id: "01a0d5f3-3fdb-7840-8fb0-a92e22e2b030",
  type: "page-type/temper-lore-book",
  slug: "plea-for-open-eyes",
  title: "Plea for Open Eyes",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 2952,
  bookIndex: 98,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 660, mapCount: 6 },
    { mapId: 667, mapCount: 46 },
  ],
} as const satisfies TemperLoreBook
