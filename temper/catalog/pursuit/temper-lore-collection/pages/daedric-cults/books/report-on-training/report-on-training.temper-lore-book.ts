import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reportOnTraining = {
  id: "01a0d5f2-253b-7aa6-a6d7-5003e9eccef2",
  type: "page-type/temper-lore-book",
  slug: "report-on-training",
  title: "Report on Training",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 512,
  bookIndex: 14,
  charted: true,
  quest: 4201,
  positions: "jsonl",
} as const satisfies TemperLoreBook
