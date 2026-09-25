import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterConceringTredecim = {
  id: "01a0d60c-eb9b-70d9-97e1-582c9bb167ac",
  type: "page-type/temper-lore-book",
  slug: "letter-concering-tredecim",
  title: "Letter Concering Tredecim",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7623,
  charted: true,
  quest: 6990,
  positions: "jsonl",
} as const satisfies TemperLoreBook
