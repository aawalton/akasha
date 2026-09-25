import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oathOfTheKeepers = {
  id: "01a0d60c-eb9c-7539-90f1-c44947c82bc0",
  type: "page-type/temper-lore-book",
  slug: "oath-of-the-keepers",
  title: "Oath of the Keepers",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7418,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
