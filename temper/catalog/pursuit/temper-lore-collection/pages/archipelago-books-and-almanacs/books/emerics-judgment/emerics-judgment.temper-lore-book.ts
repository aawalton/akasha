import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const emericsJudgment = {
  id: "01a0d60c-baf3-7b51-8d16-57676480006f",
  type: "page-type/temper-lore-book",
  slug: "emerics-judgment",
  title: "Emeric's Judgment",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7538,
  bookIndex: 53,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
