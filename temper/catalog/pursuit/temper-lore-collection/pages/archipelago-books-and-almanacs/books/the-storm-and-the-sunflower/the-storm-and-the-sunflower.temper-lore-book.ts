import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theStormAndTheSunflower = {
  id: "01a0d60c-baf4-7286-b947-b748798cd3d1",
  type: "page-type/temper-lore-book",
  slug: "the-storm-and-the-sunflower",
  title: "The Storm and the Sunflower",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7598,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
