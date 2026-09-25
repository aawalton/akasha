import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const druidFuneralsAPieceOfYffre = {
  id: "01a0d60c-baf3-7814-b521-48d962ef44f9",
  type: "page-type/temper-lore-book",
  slug: "druid-funerals-a-piece-of-yffre",
  title: "Druid Funerals: A Piece of Y'ffre",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7523,
  bookIndex: 38,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
