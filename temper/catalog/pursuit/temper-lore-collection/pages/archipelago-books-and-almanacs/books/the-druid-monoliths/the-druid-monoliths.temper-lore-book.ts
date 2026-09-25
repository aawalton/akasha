import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDruidMonoliths = {
  id: "01a0d60c-baf4-7827-a1c6-ff68a018a678",
  type: "page-type/temper-lore-book",
  slug: "the-druid-monoliths",
  title: "The Druid Monoliths",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7363,
  bookIndex: 29,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
