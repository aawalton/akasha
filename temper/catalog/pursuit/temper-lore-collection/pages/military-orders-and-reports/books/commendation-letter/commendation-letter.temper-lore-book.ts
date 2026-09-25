import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const commendationLetter = {
  id: "01a0d5f3-7052-7b82-8740-3578b5bd7bab",
  type: "page-type/temper-lore-book",
  slug: "commendation-letter",
  title: "Commendation Letter",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 831,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
