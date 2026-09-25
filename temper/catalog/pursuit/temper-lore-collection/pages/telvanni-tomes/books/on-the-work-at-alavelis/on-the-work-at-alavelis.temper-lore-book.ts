import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheWorkAtAlavelis = {
  id: "01a0d60c-eb9c-788b-b70a-da0ac47aa627",
  type: "page-type/temper-lore-book",
  slug: "on-the-work-at-alavelis",
  title: "On the Work at Alavelis",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7575,
  bookIndex: 16,
  charted: true,
  quest: 6974,
  positions: "jsonl",
} as const satisfies TemperLoreBook
