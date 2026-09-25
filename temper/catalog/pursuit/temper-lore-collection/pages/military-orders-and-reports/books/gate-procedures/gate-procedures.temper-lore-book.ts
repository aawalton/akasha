import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gateProcedures = {
  id: "01a0d5f3-7052-7ac3-930d-4be3d944faf5",
  type: "page-type/temper-lore-book",
  slug: "gate-procedures",
  title: "Gate Procedures",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 535,
  bookIndex: 21,
  charted: true,
  quest: 4086,
  positions: "jsonl",
} as const satisfies TemperLoreBook
