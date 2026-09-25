import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromQueenEuraxia = {
  id: "01a0d5f3-7053-745f-b73e-895cdc39a9e7",
  type: "page-type/temper-lore-book",
  slug: "letter-from-queen-euraxia",
  title: "Letter from Queen Euraxia",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 5464,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
