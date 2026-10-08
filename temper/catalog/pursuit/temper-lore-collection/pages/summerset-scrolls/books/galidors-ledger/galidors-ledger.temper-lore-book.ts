import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const galidorsLedger = {
  id: "01a0d60a-d5bc-74cc-995f-6acbc4f48e0b",
  type: "page-type/temper-lore-book",
  slug: "galidors-ledger",
  title: "Galidor's Ledger",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4720,
  bookIndex: 66,
  charted: true,
  quest: 6111,
  positions: "jsonl",
  createdAt: "2026-09-25T00:50:29.436Z",
  updatedAt: "2026-09-25T00:50:31.000Z",
} as const satisfies TemperLoreBook
