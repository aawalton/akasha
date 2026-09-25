import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const deathToAllMages = {
  id: "01a0d60c-eb9b-7be1-8583-a37ed51908e7",
  type: "page-type/temper-lore-book",
  slug: "death-to-all-mages",
  title: "Death to All Mages",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7589,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
