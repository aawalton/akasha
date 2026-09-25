import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const spikeballHandbill = {
  id: "01a0d5f2-83a3-7018-b77e-889ae9aa0437",
  type: "page-type/temper-lore-book",
  slug: "spikeball-handbill",
  title: "Spikeball Handbill",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1445,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
