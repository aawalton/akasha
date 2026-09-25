import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reportForBitterblade = {
  id: "01a0d60b-8108-7a9e-95ed-73bf24bd408c",
  type: "page-type/temper-lore-book",
  slug: "report-for-bitterblade",
  title: "Report for Bitterblade",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6115,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
