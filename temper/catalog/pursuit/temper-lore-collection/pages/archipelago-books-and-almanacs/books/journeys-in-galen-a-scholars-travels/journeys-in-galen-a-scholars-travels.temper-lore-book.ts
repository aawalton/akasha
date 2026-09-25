import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journeysInGalenAScholarsTravels = {
  id: "01a0d60c-baf3-7ca7-aaf1-e3186cd9571a",
  type: "page-type/temper-lore-book",
  slug: "journeys-in-galen-a-scholars-travels",
  title: "Journeys In Galen: A Scholar's Travels",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7530,
  bookIndex: 45,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
