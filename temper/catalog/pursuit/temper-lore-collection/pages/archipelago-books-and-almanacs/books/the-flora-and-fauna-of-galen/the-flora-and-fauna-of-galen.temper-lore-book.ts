import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFloraAndFaunaOfGalen = {
  id: "01a0d60c-baf4-7b77-9b30-9744905e4825",
  type: "page-type/temper-lore-book",
  slug: "the-flora-and-fauna-of-galen",
  title: "The Flora and Fauna of Galen",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7360,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
