import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scentOfGravesReport = {
  id: "01a0d5f2-253b-75bb-9a60-20e3e10e61da",
  type: "page-type/temper-lore-book",
  slug: "scent-of-graves-report",
  title: "Scent-of-Graves' Report",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 511,
  bookIndex: 13,
  charted: true,
  quest: 4201,
  positions: "jsonl",
} as const satisfies TemperLoreBook
