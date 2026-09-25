import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const winesOfTheSystres = {
  id: "01a0d60c-baf4-7749-8311-9fa3763a50cf",
  type: "page-type/temper-lore-book",
  slug: "wines-of-the-systres",
  title: "Wines of the Systres",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7359,
  bookIndex: 27,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
