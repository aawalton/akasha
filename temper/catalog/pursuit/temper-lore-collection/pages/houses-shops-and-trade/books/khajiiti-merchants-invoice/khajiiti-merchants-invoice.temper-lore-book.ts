import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const khajiitiMerchantsInvoice = {
  id: "01a0d5f2-db26-7735-a109-fd3b1c9e2bcb",
  type: "page-type/temper-lore-book",
  slug: "khajiiti-merchants-invoice",
  title: "Khajiiti Merchant's Invoice",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1763,
  bookIndex: 61,
  charted: true,
  quest: 4815,
  positions: "jsonl",
} as const satisfies TemperLoreBook
