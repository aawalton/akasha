import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const folsisReport = {
  id: "01a0d60c-eb9b-7740-b1de-70b305c602c6",
  type: "page-type/temper-lore-book",
  slug: "folsis-report",
  title: "Folsi's Report",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7618,
  bookIndex: 89,
  charted: true,
  quest: 6990,
  positions: "jsonl",
} as const satisfies TemperLoreBook
