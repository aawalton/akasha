import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vosTaxRecords = {
  id: "01a0d5f2-db27-7c37-ac2a-eeee44a3ee0f",
  type: "page-type/temper-lore-book",
  slug: "vos-tax-records",
  title: "Vos Tax Records",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 4526,
  bookIndex: 85,
  charted: true,
  quest: 5934,
  positions: "jsonl",
} as const satisfies TemperLoreBook
