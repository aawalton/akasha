import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const druidFoodOfVastyr = {
  id: "01a0d60c-baf3-7115-a495-2b34fea22155",
  type: "page-type/temper-lore-book",
  slug: "druid-food-of-vastyr",
  title: "Druid Food of Vastyr",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7529,
  bookIndex: 44,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
