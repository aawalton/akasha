import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const invoiceForComestibles = {
  id: "01a0d60a-d5bd-79d4-80aa-75d49a385780",
  type: "page-type/temper-lore-book",
  slug: "invoice-for-comestibles",
  title: "Invoice for Comestibles",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4898,
  bookIndex: 83,
  charted: true,
  quest: 6121,
  positions: "jsonl",
} as const satisfies TemperLoreBook
