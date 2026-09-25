import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legacyOfTheBretons = {
  id: "01a0d60c-baf3-78f3-90dc-f22677a25fe5",
  type: "page-type/temper-lore-book",
  slug: "legacy-of-the-bretons",
  title: "Legacy of the Bretons",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7540,
  bookIndex: 55,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
