import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const adventurersTakeHeed = {
  id: "01a0d60c-eb9a-706a-bf41-4b1cc4625268",
  type: "page-type/temper-lore-book",
  slug: "adventurers-take-heed",
  title: "Adventurers, Take Heed!",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7626,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
