import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterConcerningTredecim = {
  id: "01a0d60c-eb9b-7b5f-90de-d6c6e17a1180",
  type: "page-type/temper-lore-book",
  slug: "letter-concerning-tredecim",
  title: "Letter Concerning Tredecim",
  collection: "temper-lore-collection/telvanni-tomes",
  bookIndex: 25,
} as const satisfies TemperLoreBook
