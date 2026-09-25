import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const molithTheMudcrab = {
  id: "01a0d60c-baf3-7502-a8fb-7a0a12b7372d",
  type: "page-type/temper-lore-book",
  slug: "molith-the-mudcrab",
  title: "Molith the Mudcrab",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7522,
  bookIndex: 37,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
