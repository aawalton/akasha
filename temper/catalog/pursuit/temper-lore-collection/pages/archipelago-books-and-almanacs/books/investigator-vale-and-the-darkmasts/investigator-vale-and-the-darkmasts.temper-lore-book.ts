import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const investigatorValeAndTheDarkmasts = {
  id: "01a0d60c-baf3-701b-861f-651ea6b4a45c",
  type: "page-type/temper-lore-book",
  slug: "investigator-vale-and-the-darkmasts",
  title: "Investigator Vale and the Darkmasts",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7524,
  bookIndex: 39,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
