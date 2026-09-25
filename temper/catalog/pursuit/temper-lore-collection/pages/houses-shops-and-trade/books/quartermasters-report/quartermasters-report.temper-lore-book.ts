import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const quartermastersReport = {
  id: "01a0d5f2-db26-7362-9093-8220d83361d8",
  type: "page-type/temper-lore-book",
  slug: "quartermasters-report",
  title: "Quartermaster's Report",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 678,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
