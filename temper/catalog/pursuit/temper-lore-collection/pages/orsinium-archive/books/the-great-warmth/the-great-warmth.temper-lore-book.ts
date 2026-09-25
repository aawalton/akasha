import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGreatWarmth = {
  id: "01a0d5f7-160b-7c57-85af-53567d3aefb4",
  type: "page-type/temper-lore-book",
  slug: "the-great-warmth",
  title: "The Great Warmth",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 2773,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
