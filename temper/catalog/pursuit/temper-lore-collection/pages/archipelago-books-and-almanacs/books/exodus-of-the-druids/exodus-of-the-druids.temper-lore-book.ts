import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const exodusOfTheDruids = {
  id: "01a0d60c-baf3-7a41-8e31-ba28c254cebc",
  type: "page-type/temper-lore-book",
  slug: "exodus-of-the-druids",
  title: "Exodus of the Druids",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7536,
  bookIndex: 51,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
