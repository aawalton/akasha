import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shadAstulaCurriculum = {
  id: "01a0d5f2-83a3-7db1-bebb-5c50b84ad654",
  type: "page-type/temper-lore-book",
  slug: "shad-astula-curriculum",
  title: "Shad Astula Curriculum",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 653,
  bookIndex: 12,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 10, mapCount: 34 },
    { mapId: 26, mapCount: 8 },
    { mapId: 27, mapCount: 5 },
    { mapId: 300, mapCount: 25 },
  ],
} as const satisfies TemperLoreBook
