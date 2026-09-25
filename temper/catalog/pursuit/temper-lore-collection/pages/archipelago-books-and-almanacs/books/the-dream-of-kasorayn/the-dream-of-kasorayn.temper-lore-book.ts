import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDreamOfKasorayn = {
  id: "01a0d60c-baf4-7957-8f97-0f9129cd28a1",
  type: "page-type/temper-lore-book",
  slug: "the-dream-of-kasorayn",
  title: "The Dream of Kasorayn",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7361,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
