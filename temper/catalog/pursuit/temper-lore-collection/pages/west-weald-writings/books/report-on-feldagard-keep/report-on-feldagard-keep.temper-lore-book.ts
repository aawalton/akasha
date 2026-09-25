import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reportOnFeldagardKeep = {
  id: "01a0d60d-4ab0-7636-8991-bf33f8a6e245",
  type: "page-type/temper-lore-book",
  slug: "report-on-feldagard-keep",
  title: "Report on Feldagard Keep",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8106,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
