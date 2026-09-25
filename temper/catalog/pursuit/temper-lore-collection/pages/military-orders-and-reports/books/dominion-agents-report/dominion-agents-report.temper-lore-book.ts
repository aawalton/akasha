import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dominionAgentsReport = {
  id: "01a0d5f3-7052-7da0-ad58-26498f19f169",
  type: "page-type/temper-lore-book",
  slug: "dominion-agents-report",
  title: "Dominion Agent's Report",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 130,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
