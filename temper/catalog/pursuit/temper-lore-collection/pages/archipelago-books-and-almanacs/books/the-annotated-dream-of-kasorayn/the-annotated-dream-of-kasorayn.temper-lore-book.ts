import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAnnotatedDreamOfKasorayn = {
  id: "01a0d60c-baf4-7b0f-af1e-df592e15bd8c",
  type: "page-type/temper-lore-book",
  slug: "the-annotated-dream-of-kasorayn",
  title: "The Annotated Dream of Kasorayn",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7356,
  bookIndex: 26,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
