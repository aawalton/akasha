import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sadrithMoraTaxRecords = {
  id: "01a0d5f2-db26-7ecf-be6d-710142b69f4b",
  type: "page-type/temper-lore-book",
  slug: "sadrith-mora-tax-records",
  title: "Sadrith Mora Tax Records",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 4527,
  bookIndex: 84,
  charted: true,
  quest: 5934,
  positions: "jsonl",
} as const satisfies TemperLoreBook
