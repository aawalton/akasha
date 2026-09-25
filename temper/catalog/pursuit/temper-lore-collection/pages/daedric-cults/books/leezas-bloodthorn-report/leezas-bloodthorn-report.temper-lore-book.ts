import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const leezasBloodthornReport = {
  id: "01a0d5f2-253b-765a-8aaf-8d5c98aa02d4",
  type: "page-type/temper-lore-book",
  slug: "leezas-bloodthorn-report",
  title: "Leeza's Bloodthorn Report",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2464,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
