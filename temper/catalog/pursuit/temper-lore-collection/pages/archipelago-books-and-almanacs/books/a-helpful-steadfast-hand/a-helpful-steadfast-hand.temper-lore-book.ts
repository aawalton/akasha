import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aHelpfulSteadfastHand = {
  id: "01a0d60c-baf2-7cfc-bb7e-48967ee719b8",
  type: "page-type/temper-lore-book",
  slug: "a-helpful-steadfast-hand",
  title: "A Helpful, Steadfast Hand",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7541,
  bookIndex: 56,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
