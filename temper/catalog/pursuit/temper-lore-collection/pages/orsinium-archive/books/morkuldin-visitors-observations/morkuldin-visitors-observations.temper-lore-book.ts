import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const morkuldinVisitorsObservations = {
  id: "01a0d5f7-160b-74af-a2cc-99fd2fa78fec",
  type: "page-type/temper-lore-book",
  slug: "morkuldin-visitors-observations",
  title: "Morkuldin Visitor's Observations",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3208,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
