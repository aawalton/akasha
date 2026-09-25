import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reportOnOperationSiphon = {
  id: "01a0d60c-eb9c-7faa-874e-0b7c6cabcb3f",
  type: "page-type/temper-lore-book",
  slug: "report-on-operation-siphon",
  title: "Report on Operation Siphon",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7624,
  bookIndex: 24,
  charted: true,
  quest: 6990,
  positions: "jsonl",
} as const satisfies TemperLoreBook
