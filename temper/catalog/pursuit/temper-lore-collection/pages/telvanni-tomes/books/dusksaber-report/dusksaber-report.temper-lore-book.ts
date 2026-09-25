import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dusksaberReport = {
  id: "01a0d60c-eb9b-7455-a7c1-e56a59266b5c",
  type: "page-type/temper-lore-book",
  slug: "dusksaber-report",
  title: "Dusksaber Report",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7612,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
