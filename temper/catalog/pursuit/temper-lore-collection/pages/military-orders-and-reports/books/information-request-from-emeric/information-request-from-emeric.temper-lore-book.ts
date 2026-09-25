import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const informationRequestFromEmeric = {
  id: "01a0d5f3-7053-7203-9735-5ed714791b1a",
  type: "page-type/temper-lore-book",
  slug: "information-request-from-emeric",
  title: "Information Request from Emeric",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2298,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
