import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dominionCondolences = {
  id: "01a0d5f3-7052-7261-a0e3-53e35492d3a4",
  type: "page-type/temper-lore-book",
  slug: "dominion-condolences",
  title: "Dominion Condolences",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2050,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
