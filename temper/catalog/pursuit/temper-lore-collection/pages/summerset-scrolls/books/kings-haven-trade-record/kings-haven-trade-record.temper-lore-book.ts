import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kingsHavenTradeRecord = {
  id: "01a0d60a-d5bd-7e1c-a5a3-cbd867867d65",
  type: "page-type/temper-lore-book",
  slug: "kings-haven-trade-record",
  title: "King's Haven Trade Record",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4982,
  bookIndex: 98,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
