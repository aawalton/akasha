import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const concerningGarick = {
  id: "01a0d5f3-7052-7ed3-9e6e-92371b5152c4",
  type: "page-type/temper-lore-book",
  slug: "concerning-garick",
  title: "Concerning Garick",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 886,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
