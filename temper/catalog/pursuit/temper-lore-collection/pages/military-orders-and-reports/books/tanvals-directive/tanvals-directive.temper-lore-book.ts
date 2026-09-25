import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tanvalsDirective = {
  id: "01a0d5f3-7054-7923-a198-2a4f310d0eb3",
  type: "page-type/temper-lore-book",
  slug: "tanvals-directive",
  title: "Tanval's Directive",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 333,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
