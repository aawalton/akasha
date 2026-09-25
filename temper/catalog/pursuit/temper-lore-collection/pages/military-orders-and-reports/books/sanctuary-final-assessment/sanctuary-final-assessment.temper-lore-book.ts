import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sanctuaryFinalAssessment = {
  id: "01a0d5f3-7054-72a6-a176-ce636e348f28",
  type: "page-type/temper-lore-book",
  slug: "sanctuary-final-assessment",
  title: "Sanctuary: Final Assessment",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 988,
  bookIndex: 43,
  charted: true,
  quest: 4436,
  positions: "jsonl",
} as const satisfies TemperLoreBook
