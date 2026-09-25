import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dominionOrdersEnduum = {
  id: "01a0d5f3-7052-7352-89a1-c11b1efd9270",
  type: "page-type/temper-lore-book",
  slug: "dominion-orders-enduum",
  title: "Dominion Orders: Enduum",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 85,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
