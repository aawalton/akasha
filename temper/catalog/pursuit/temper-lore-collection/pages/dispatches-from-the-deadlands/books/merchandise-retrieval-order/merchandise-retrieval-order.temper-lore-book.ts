import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const merchandiseRetrievalOrder = {
  id: "01a0d60c-40c0-77c6-b1c7-b907c044141c",
  type: "page-type/temper-lore-book",
  slug: "merchandise-retrieval-order",
  title: "Merchandise Retrieval Order",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6851,
  bookIndex: 68,
  charted: true,
  quest: 6738,
  positions: "jsonl",
} as const satisfies TemperLoreBook
