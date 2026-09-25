import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const logOfTheIntractable = {
  id: "01a0d5f3-7053-789e-8ed4-91116da5e156",
  type: "page-type/temper-lore-book",
  slug: "log-of-the-intractable",
  title: "Log of the Intractable",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 672,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
