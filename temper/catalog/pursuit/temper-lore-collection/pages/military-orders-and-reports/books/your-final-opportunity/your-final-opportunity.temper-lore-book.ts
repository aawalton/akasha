import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yourFinalOpportunity = {
  id: "01a0d5f3-7054-7845-bc66-50863938e608",
  type: "page-type/temper-lore-book",
  slug: "your-final-opportunity",
  title: "Your Final Opportunity",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2214,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
