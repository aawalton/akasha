import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrollOfBanishment = {
  id: "01a0d5f3-7054-71e2-9090-09c845115849",
  type: "page-type/temper-lore-book",
  slug: "scroll-of-banishment",
  title: "Scroll of Banishment",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 327,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
