import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const regardingTheHall = {
  id: "01a0d5f3-7054-763e-bcee-fc54b6650bfe",
  type: "page-type/temper-lore-book",
  slug: "regarding-the-hall",
  title: "Regarding the Hall",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2051,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
