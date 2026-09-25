import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dominionMilitaryRecruitment = {
  id: "01a0d5f3-7052-7302-a5c7-75eda7e1d776",
  type: "page-type/temper-lore-book",
  slug: "dominion-military-recruitment",
  title: "Dominion Military Recruitment",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2296,
  bookIndex: 87,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
