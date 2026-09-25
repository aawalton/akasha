import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const guardDuty = {
  id: "01a0d5f3-7053-734a-ba51-19d18e971266",
  type: "page-type/temper-lore-book",
  slug: "guard-duty",
  title: "Guard Duty",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 686,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
