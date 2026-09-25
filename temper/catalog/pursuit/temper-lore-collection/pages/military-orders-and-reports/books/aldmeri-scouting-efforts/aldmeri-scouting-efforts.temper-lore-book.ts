import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aldmeriScoutingEfforts = {
  id: "01a0d5f3-7052-7221-90ac-7845b18fad01",
  type: "page-type/temper-lore-book",
  slug: "aldmeri-scouting-efforts",
  title: "Aldmeri Scouting Efforts",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2267,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
