import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFinalDreamOfKasorayn = {
  id: "01a0d60c-baf4-7ee6-9f5b-0f052dd10c1d",
  type: "page-type/temper-lore-book",
  slug: "the-final-dream-of-kasorayn",
  title: "The Final Dream of Kasorayn",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7365,
  bookIndex: 10,
  charted: true,
  quest: 6852,
  positions: "jsonl",
} as const satisfies TemperLoreBook
