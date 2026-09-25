import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ranksAndTitlesOfHouseTelvanni = {
  id: "01a0d60c-eb9c-776c-ad44-38dc1e895559",
  type: "page-type/temper-lore-book",
  slug: "ranks-and-titles-of-house-telvanni",
  title: "Ranks and Titles of House Telvanni",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7422,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
