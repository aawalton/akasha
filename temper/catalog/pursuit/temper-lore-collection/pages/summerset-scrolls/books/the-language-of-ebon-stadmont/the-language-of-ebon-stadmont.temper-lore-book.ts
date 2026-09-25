import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLanguageOfEbonStadmont = {
  id: "01a0d60a-d5be-7073-a0f5-a1cb70ce952f",
  type: "page-type/temper-lore-book",
  slug: "the-language-of-ebon-stadmont",
  title: "The Language of Ebon Stadmont",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4988,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
