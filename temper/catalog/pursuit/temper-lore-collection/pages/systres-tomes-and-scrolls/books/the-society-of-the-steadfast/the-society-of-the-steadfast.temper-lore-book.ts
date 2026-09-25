import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSocietyOfTheSteadfast = {
  id: "01a0d60c-75b6-7644-a0b5-3975a98b8d14",
  type: "page-type/temper-lore-book",
  slug: "the-society-of-the-steadfast",
  title: "The Society of the Steadfast",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7113,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
