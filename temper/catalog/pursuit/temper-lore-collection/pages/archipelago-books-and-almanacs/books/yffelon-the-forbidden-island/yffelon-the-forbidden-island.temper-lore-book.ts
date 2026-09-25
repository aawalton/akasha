import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yffelonTheForbiddenIsland = {
  id: "01a0d60c-baf4-7a26-ac75-bf162db3f7a6",
  type: "page-type/temper-lore-book",
  slug: "yffelon-the-forbidden-island",
  title: "Y'ffelon, the Forbidden Island",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7364,
  bookIndex: 30,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
