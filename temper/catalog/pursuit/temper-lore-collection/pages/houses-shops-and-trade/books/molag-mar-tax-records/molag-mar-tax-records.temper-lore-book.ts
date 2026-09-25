import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const molagMarTaxRecords = {
  id: "01a0d5f2-db26-79eb-aa27-b3039ad20301",
  type: "page-type/temper-lore-book",
  slug: "molag-mar-tax-records",
  title: "Molag Mar\tTax Records",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 4525,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
