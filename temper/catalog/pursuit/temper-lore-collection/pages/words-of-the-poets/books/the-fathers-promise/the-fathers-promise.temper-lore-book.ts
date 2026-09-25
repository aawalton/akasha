import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFathersPromise = {
  id: "01a0d5f6-1c16-7c83-8fde-843519790050",
  type: "page-type/temper-lore-book",
  slug: "the-fathers-promise",
  title: "The Father's Promise",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 715,
  bookIndex: 18,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 22, mapCount: 17 },
    { mapId: 27, mapCount: 2 },
    { mapId: 30, mapCount: 8 },
    { mapId: 61, mapCount: 4 },
  ],
} as const satisfies TemperLoreBook
