import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onNatureSpirits = {
  id: "01a0d60c-baf3-7f58-8fc7-e0387bd2f60c",
  type: "page-type/temper-lore-book",
  slug: "on-nature-spirits",
  title: "On Nature Spirits",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7539,
  bookIndex: 54,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
