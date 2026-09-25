import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tarnurMineReport = {
  id: "01a0d60d-ff6a-714e-a8dd-2e73adc14b9c",
  type: "page-type/temper-lore-book",
  slug: "tarnur-mine-report",
  title: "Tarnur Mine Report",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8523,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
