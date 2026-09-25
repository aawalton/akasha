import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const specialAdvisors = {
  id: "01a0d5f3-7054-73b7-b47c-53b28b89d0bf",
  type: "page-type/temper-lore-book",
  slug: "special-advisors",
  title: "Special Advisors",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 940,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
